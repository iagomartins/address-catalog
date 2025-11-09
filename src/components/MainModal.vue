<template>
  <Modal
    :is-open="isOpen"
    :title="`${t('create')} ${t('registry')}`"
    @close="close"
  >
    <template #body>
      <form class="space-y-4 w-full" @submit.prevent="handleSubmit">
        <Input
          v-model="formValues.name"
          :label="t('name')"
          name="name"
          autocomplete="name"
          required
        />
        <Input
          v-model="formValues.address"
          :label="t('address')"
          name="address"
          autocomplete="address"
          required
        />
        <Input
          v-model="formValues.phone"
          :label="t('phone')"
          name="phone"
          type="tel"
          autocomplete="tel"
          required
        />
        <Input
          v-model="formValues.email"
          :label="t('email')"
          name="email"
          type="email"
          autocomplete="email"
          required
        />
      </form>
    </template>
    <template #footer>
      <Button variant="secondary" @click="close">
        {{ t('cancel') }}
      </Button>
      <Button variant="primary" @click="handleSubmit">
        {{ t('create') }}
      </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUIStore } from '../stores/ui'
import { useAddressesStore } from '../stores/addresses'
import Modal from './ui/Modal.vue'
import Input from './ui/Input.vue'
import Button from './ui/Button.vue'

const { t } = useI18n()
const uiStore = useUIStore()
const addressesStore = useAddressesStore()

const formValues = ref({
  name: '',
  address: '',
  phone: '',
  email: ''
})

const isOpen = computed(() => uiStore.isModalOpen && uiStore.activeModal === 'create')

watch(isOpen, (newValue) => {
  if (!newValue) {
    // Reset form when modal closes
    formValues.value = {
      name: '',
      address: '',
      phone: '',
      email: ''
    }
  }
})

async function handleSubmit() {
  try {
    await addressesStore.createAddress(
      formValues.value.name,
      formValues.value.address,
      formValues.value.phone,
      formValues.value.email
    )
    close()
  } catch (error) {
    console.error('Error creating address:', error)
  }
}

function close() {
  uiStore.closeModal()
}
</script>
