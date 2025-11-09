<template>
  <div>
    <button
      @click="open"
      class="inline-flex items-center justify-center p-2 text-teal-500 hover:text-teal-400 hover:bg-teal-500/10 rounded-md transition-colors cursor-pointer"
    >
      <FontAwesomeIcon :icon="icon" />
    </button>
    <Modal
      :is-open="isModalOpen"
      :title="`${title} ${t('registry')}`"
      @close="close"
    >
      <template #body>
        <p class="text-gray-300">
          {{ t('rusure') }} {{ msg }} {{ t('item') }}?
        </p>
      </template>
      <template #footer>
        <Button variant="secondary" @click="close">
          {{ t('no') }}
        </Button>
        <Button
          :variant="title === t('delete') ? 'danger' : 'primary'"
          @click="handleConfirm"
        >
          {{ t('yes') }}
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useUIStore } from '../stores/ui'
import Modal from './ui/Modal.vue'
import Button from './ui/Button.vue'

const { t } = useI18n()
const uiStore = useUIStore()

const localOpen = ref(false)

const props = defineProps<{
  addressId: number
  status: string
  confirmAction: (id: number, status: string | undefined) => Promise<void>
  msg: string
  title: string
  icon: IconDefinition
}>()

const isModalOpen = computed(() => localOpen.value)

function open() {
  localOpen.value = true
}

function close() {
  localOpen.value = false
}

async function handleConfirm() {
  const newStatus = props.status === 'N' ? 'S' : 'N'
  await props.confirmAction(props.addressId, newStatus)
  close()
}
</script>
