import type { DbId } from '../types/DbId'
import sqlite3Worker1Promiser from '@sqlite.org/sqlite-wasm'
import { ref } from 'vue'

const databaseConfig = {
  filename: 'file:mydb.sqlite3?vfs=opfs',
  tables: {
    orders: {
      name: 'orders_table',
      schema: `
        CREATE TABLE IF NOT EXISTS orders_table (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          address TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT NOT NULL,
          completed TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `,
    },
  },
} as const

export function useSQLite() {
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const isInitialized = ref(false)

  let promiser: ReturnType<typeof sqlite3Worker1Promiser> | null = null
  let dbId: string | null = null

  async function initialize() {
    if (isInitialized.value) return true

    isLoading.value = true
    error.value = null

    try {
      // Check for SharedArrayBuffer support
      if (typeof SharedArrayBuffer === 'undefined') {
        throw new Error(
          'SharedArrayBuffer is not available. This is required for SQLite WASM with OPFS. ' +
            'Please ensure: 1) You are using a modern browser, 2) Accessing via localhost (not file://), ' +
            '3) Required headers are set in vite.config.ts (Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy)',
        )
      }

      console.log('Starting SQLite WASM initialization...')

      // Add timeout to prevent infinite loading
      const initPromise = new Promise<ReturnType<typeof sqlite3Worker1Promiser>>(
        (resolve, reject) => {
          let resolved = false
          const timeout = setTimeout(() => {
            if (!resolved) {
              resolved = true
              reject(
                new Error(
                  'SQLite initialization timeout after 20 seconds. ' +
                    'The worker may not be initializing. Check browser console for detailed errors.',
                ),
              )
            }
          }, 20000) // 20 second timeout

          console.log('Creating SQLite worker...')
          try {
            const _promiser = sqlite3Worker1Promiser({
              onready: () => {
                if (!resolved) {
                  resolved = true
                  console.log('SQLite worker ready!')
                  clearTimeout(timeout)
                  resolve(_promiser)
                }
              },
              onunhandled: (event: MessageEvent) => {
                console.warn('SQLite worker unhandled message:', event)
                // Don't reject here as onunhandled is for logging, not errors
              },
              debug: (...args: unknown[]) => {
                console.log('[SQLite Debug]', ...args)
              },
            })

            // If promiser is returned synchronously, resolve immediately
            if (_promiser && typeof _promiser === 'function') {
              // Check if it's already ready (some versions return the promiser immediately)
              setTimeout(() => {
                if (!resolved) {
                  // Try to use it - if onready hasn't fired, the promiser might still work
                  console.log('Promiser returned, waiting for onready...')
                }
              }, 100)
            }
          } catch (err) {
            if (!resolved) {
              resolved = true
              clearTimeout(timeout)
              reject(err)
            }
          }
        },
      )

      promiser = await initPromise

      if (!promiser) throw new Error('Failed to initialize promiser')

      console.log('Configuring SQLite...')
      await promiser('config-get', {})

      console.log('Opening database...')
      const openResponse = await promiser('open', {
        filename: databaseConfig.filename,
      })

      if (openResponse.type === 'error') {
        throw new Error(openResponse.result.message)
      }

      dbId = openResponse.result.dbId as string

      console.log('Creating tables...')
      await promiser('exec', {
        dbId,
        sql: databaseConfig.tables.orders.schema,
      })

      isInitialized.value = true
      console.log('SQLite initialized successfully!')
      return true
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Unknown error')
      isLoading.value = false
      console.error('SQLite initialization error:', err)
      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  async function executeQuery(sql: string, params: unknown[] = []) {
    if (!dbId || !promiser) {
      await initialize()
    }

    isLoading.value = true
    error.value = null

    try {
      const result = await promiser!('exec', {
        dbId: dbId as DbId,
        sql,
        bind: params,
        returnValue: 'resultRows',
      })

      if (result.type === 'error') {
        throw new Error(result.result.message)
      }

      return result
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Query execution failed')
      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    isInitialized,
    executeQuery,
  }
}
