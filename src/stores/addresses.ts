import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSQLite } from '../db/SQLite'
import type { Address } from '../types/Address'
import { mkConfig, generateCsv, download } from 'export-to-csv'

export const useAddressesStore = defineStore('addresses', () => {
  const sqlite = useSQLite()
  
  // State
  const addresses = ref<Address[]>([])
  const queryError = ref<string | null>(null)
  const isLoading = computed(() => sqlite.isLoading.value)
  const error = computed(() => sqlite.error.value)

  // Getters
  const completedAddresses = computed(() => 
    addresses.value.filter(addr => addr.completed === 'S')
  )

  const pendingAddresses = computed(() => 
    addresses.value.filter(addr => addr.completed === 'N')
  )

  // Actions
  async function fetchAddresses() {
    queryError.value = null
    
    try {
      const result = await sqlite.executeQuery('SELECT * FROM orders_table', [])
      const rows = result?.result.resultRows || []
      
      addresses.value = rows.map((row: unknown[]) => ({
        id: Number(row[0]),
        name: String(row[1]),
        address: String(row[2]),
        phone: String(row[3]),
        email: String(row[4]),
        completed: String(row[5]),
        created_at: String(row[6])
      }))
    } catch (err) {
      queryError.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching addresses:', err)
      throw err
    }
  }

  async function createAddress(name: string, address: string, phone: string, email: string) {
    const date = new Date()
    const formattedDate = date.toLocaleString('pt-BR').replace(',', '')
    const cleanedAddress = address.replace(',', '')
    
    try {
      await sqlite.executeQuery(
        `INSERT INTO orders_table (name, address, phone, email, completed, created_at)
         VALUES (?, ?, ?, ?, 'N', ?)`,
        [name, cleanedAddress, phone, email, formattedDate]
      )
      await fetchAddresses()
    } catch (err) {
      queryError.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error creating address:', err)
      throw err
    }
  }

  async function updateAddress(id: number, completed: string) {
    try {
      await sqlite.executeQuery(
        'UPDATE orders_table SET completed = ? WHERE id = ?',
        [completed, id]
      )
      await fetchAddresses()
    } catch (err) {
      queryError.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error updating address:', err)
      throw err
    }
  }

  async function deleteAddress(id: number) {
    try {
      await sqlite.executeQuery(
        'DELETE FROM orders_table WHERE id = ?',
        [id]
      )
      await fetchAddresses()
    } catch (err) {
      queryError.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error deleting address:', err)
      throw err
    }
  }

  function exportToCSV() {
    const csvConfig = mkConfig({ useKeysAsHeaders: true })
    const csv = generateCsv(csvConfig)(addresses.value)
    download(csvConfig)(csv)
  }

  return {
    // State
    addresses,
    queryError,
    isLoading,
    error,
    // Getters
    completedAddresses,
    pendingAddresses,
    // Actions
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    exportToCSV
  }
})

