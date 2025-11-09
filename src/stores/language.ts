import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    language: 'pt',
  }),
  actions: {
    update(value: string) {
      this.language = value
    },
  },
})
