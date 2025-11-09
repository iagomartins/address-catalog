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
      // Add timeout to prevent infinite loading
      const initPromise = new Promise<ReturnType<typeof sqlite3Worker1Promiser>>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('SQLite initialization timeout. Please check your browser console and ensure required headers are set.'))
        }, 10000) // 10 second timeout

        const _promiser = sqlite3Worker1Promiser({
          onready: () => {
            clearTimeout(timeout)
            resolve(_promiser)
          },
          onerror: (err: unknown) => {
            clearTimeout(timeout)
            reject(err)
          }
        })
      })

      promiser = await initPromise

      if (!promiser) throw new Error('Failed to initialize promiser')

      await promiser('config-get', {})
      const openResponse = await promiser('open', {
        filename: databaseConfig.filename,
      })

      if (openResponse.type === 'error') {
        throw new Error(openResponse.result.message)
      }

      dbId = openResponse.result.dbId as string

      await promiser('exec', {
        dbId,
        sql: databaseConfig.tables.orders.schema,
      })

      isInitialized.value = true
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
