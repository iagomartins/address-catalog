<template>
  <div class="flex items-center gap-2">
    <button
      @click="setLanguage('pt')"
      :class="[
        'px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200',
        languageStore.$state.language === 'pt'
          ? 'bg-teal-500 text-white'
          : 'bg-transparent text-teal-500 border border-teal-500 hover:bg-teal-500 hover:text-white'
      ]"
    >
      Português
    </button>
    <button
      @click="setLanguage('en')"
      :class="[
        'px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200',
        languageStore.$state.language === 'en'
          ? 'bg-teal-500 text-white'
          : 'bg-transparent text-teal-500 border border-teal-500 hover:bg-teal-500 hover:text-white'
      ]"
    >
      English
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { watchEffect } from 'vue'
import { useLanguageStore } from '../stores/language'

const { locale } = useI18n()
const languageStore = useLanguageStore()

const setLanguage = (newLang: string) => {
  locale.value = newLang
  localStorage.setItem('lang', newLang)
  languageStore.update(newLang)
}

watchEffect(() => {
  const storedLang = localStorage.getItem('lang')
  if (storedLang) {
    locale.value = storedLang
  }
})
</script>
