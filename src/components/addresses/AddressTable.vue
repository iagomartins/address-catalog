<template>
  <div class="w-full">
    <LoadingSpinner v-if="isLoading" />
    
    <div v-if="queryError" class="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-md text-red-200">
      {{ queryError }}
    </div>

    <div v-if="!isLoading && addresses.length === 0" class="text-center py-8 text-gray-400">
      {{ t('nodata') }}
    </div>

    <Table v-if="!isLoading && addresses.length > 0">
      <TableHeader>
        <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Id</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ t('name') }}</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ t('address') }}</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ t('phone') }}</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ t('email') }}</th>
        <th class="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{{ t('created') }}</th>
        <th class="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">{{ t('delete') }}</th>
      </TableHeader>
      <tbody class="divide-y divide-gray-700">
        <TableRow
          v-for="(address, index) in addresses"
          :key="address.id"
          :index="index"
        >
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{{ address.id }}</td>
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{{ address.name }}</td>
          <td class="px-4 py-3 text-sm text-gray-300">{{ address.address }}</td>
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{{ address.phone }}</td>
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{{ address.email }}</td>
          <td class="px-4 py-3 whitespace-nowrap text-center">
            <ConfirmModal
              v-if="address.completed === 'S'"
              :address-id="address.id"
              :status="address.completed"
              :confirm-action="handleUpdate"
              :msg="t('updating')"
              :title="t('update')"
              :icon="faCheckDouble"
            />
            <ConfirmModal
              v-else
              :address-id="address.id"
              :status="address.completed"
              :confirm-action="handleUpdate"
              :msg="t('updating')"
              :title="t('update')"
              :icon="faSpinner"
            />
          </td>
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{{ address.created_at }}</td>
          <td class="px-4 py-3 whitespace-nowrap text-center">
            <ConfirmModal
              :address-id="address.id"
              :status="address.completed"
              :confirm-action="handleDelete"
              :msg="t('deleting')"
              :title="t('delete')"
              :icon="faTrashCan"
            />
          </td>
        </TableRow>
      </tbody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { faTrashCan, faCheckDouble, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useI18n } from 'vue-i18n'
import { useAddressesStore } from '../../stores/addresses'
import Table from '../ui/Table.vue'
import TableHeader from '../ui/TableHeader.vue'
import TableRow from '../ui/TableRow.vue'
import LoadingSpinner from '../ui/LoadingSpinner.vue'
import ConfirmModal from '../ConfirmModal.vue'

const { t } = useI18n()
const addressesStore = useAddressesStore()

const addresses = computed(() => addressesStore.addresses)
const isLoading = computed(() => addressesStore.isLoading)
const queryError = computed(() => addressesStore.queryError)

async function handleUpdate(id: number, status: string | undefined) {
  if (!status) return
  const newStatus = status === 'N' ? 'S' : 'N'
  await addressesStore.updateAddress(id, newStatus)
}

async function handleDelete(id: number, status: string | undefined) {
  if (!status) return
  await addressesStore.deleteAddress(id)
}
</script>

