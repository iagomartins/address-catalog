<script setup lang="ts">
import { onMounted } from 'vue'
import { useAddressesStore } from '../stores/addresses'
import AddressTable from './addresses/AddressTable.vue'
import AddressList from './addresses/AddressList.vue'
import AddressTableActions from './addresses/AddressTableActions.vue'

const addressesStore = useAddressesStore()

onMounted(async () => {
  try {
    await addressesStore.fetchAddresses()
  } catch (error) {
    console.error('Failed to fetch addresses on mount:', error)
  }
})
</script>

<template>
  <div class="w-full">
    <!-- Desktop Table View -->
    <div class="hidden md:block">
      <AddressTable />
    </div>
    
    <!-- Mobile List View -->
    <div class="block md:hidden">
      <AddressList />
    </div>
    
    <!-- Actions -->
    <AddressTableActions />
  </div>
</template>
