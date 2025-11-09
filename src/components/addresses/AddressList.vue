<template>
  <div class="w-full">
    <LoadingSpinner v-if="isLoading" />
    
    <div v-if="queryError" class="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-md text-red-200">
      {{ queryError }}
    </div>

    <div v-if="!isLoading && addresses.length === 0" class="text-center py-8 text-gray-400">
      {{ t('nodata') }}
    </div>

    <div v-if="!isLoading && addresses.length > 0" class="space-y-2">
      <TableRowMobile
        v-for="address in addresses"
        :key="address.id"
      >
        <template #summary>
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-white">{{ address.name }}</div>
              <div class="text-sm text-gray-400">{{ address.email }}</div>
            </div>
            <div class="flex items-center gap-2">
              <span
                :class="[
                  'px-2 py-1 text-xs rounded-full',
                  address.completed === 'S' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                ]"
              >
                {{ address.completed === 'S' ? t('completed') || 'Completed' : t('pending') || 'Pending' }}
              </span>
            </div>
          </div>
        </template>
        <template #details>
          <div class="space-y-2 pt-2">
            <div>
              <span class="text-xs text-gray-400">{{ t('id') || 'ID' }}:</span>
              <span class="ml-2 text-sm text-gray-300">{{ address.id }}</span>
            </div>
            <div>
              <span class="text-xs text-gray-400">{{ t('address') }}:</span>
              <span class="ml-2 text-sm text-gray-300">{{ address.address }}</span>
            </div>
            <div>
              <span class="text-xs text-gray-400">{{ t('phone') }}:</span>
              <span class="ml-2 text-sm text-gray-300">{{ address.phone }}</span>
            </div>
            <div>
              <span class="text-xs text-gray-400">{{ t('created') }}:</span>
              <span class="ml-2 text-sm text-gray-300">{{ address.created_at }}</span>
            </div>
            <div class="flex gap-2 pt-2">
              <ConfirmModal
                :address-id="address.id"
                :status="address.completed"
                :confirm-action="handleUpdate"
                :msg="t('updating')"
                :title="t('update')"
                :icon="address.completed === 'S' ? faCheckDouble : faSpinner"
              />
              <ConfirmModal
                :address-id="address.id"
                :status="address.completed"
                :confirm-action="handleDelete"
                :msg="t('deleting')"
                :title="t('delete')"
                :icon="faTrashCan"
              />
            </div>
          </div>
        </template>
      </TableRowMobile>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { faTrashCan, faCheckDouble, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useI18n } from 'vue-i18n'
import { useAddressesStore } from '../../stores/addresses'
import TableRowMobile from '../ui/TableRowMobile.vue'
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

