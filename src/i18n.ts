import { createI18n } from 'vue-i18n'
import en from './lang/en/en.json'
import pt from './lang/pt/pt.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'pt',
  messages: {
    pt,
    en,
  },
})

export default i18n
