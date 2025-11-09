<template>
  <div class="flex items-center justify-end gap-2 mt-4">
    <Button variant="secondary" size="sm" @click="handleExport">
      <FontAwesomeIcon :icon="faDownload" class="mr-2" />
      {{ t('export') || 'Export' }}
    </Button>
    <Button variant="primary" size="sm" @click="handleCreate">
      <FontAwesomeIcon :icon="faPlus" class="mr-2" />
      {{ t('create') }} {{ t('registry') }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { faDownload, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n'
import { useAddressesStore } from '../../stores/addresses'
import { useUIStore } from '../../stores/ui'
import Button from '../ui/Button.vue'

const { t } = useI18n()
const addressesStore = useAddressesStore()
const uiStore = useUIStore()

function handleExport() {
  addressesStore.exportToCSV()
}

function handleCreate() {
  uiStore.openModal('create')
}
</script>

