<template>
  <div>
    <span @click="setLanguage('pt')" :class="`btn-default ${languageStore.$state.language === 'pt' ? 'active' : ''}`"
      style="margin-right: 8px">Português</span>
    <span @click="setLanguage('en')"
      :class="`btn-default ${languageStore.$state.language === 'en' ? 'active' : ''}`">English</span>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { watchEffect } from 'vue'
import { useLanguageStore } from '../stores/language'

const { locale } = useI18n();
const languageStore = useLanguageStore()

const setLanguage = (newLang: string) => {
  locale.value = newLang;
  localStorage.setItem('lang', newLang)
  languageStore.$state.language = newLang
};

watchEffect(() => {
  const storedLang = localStorage.getItem('lang')
  if (storedLang) {
    locale.value = storedLang
  }
});
</script>
