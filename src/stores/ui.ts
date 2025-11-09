import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ModalType = 'create' | 'confirm' | null

export const useUIStore = defineStore('ui', () => {
  // State
  const isModalOpen = ref(false)
  const activeModal = ref<ModalType>(null)
  const isLoading = ref(false)

  // Actions
  function openModal(modalType: ModalType) {
    activeModal.value = modalType
    isModalOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
    activeModal.value = null
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  return {
    // State
    isModalOpen,
    activeModal,
    isLoading,
    // Actions
    openModal,
    closeModal,
    setLoading
  }
})

