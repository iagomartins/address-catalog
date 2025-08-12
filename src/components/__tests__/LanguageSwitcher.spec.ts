import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LanguageSwitcher from '../LanguageSwitcher.vue'
import { createI18n } from 'vue-i18n'
import en from '@/lang/en/en.json'
import pt from '@/lang/pt/pt.json'
import { createPinia } from 'pinia'

describe('LanguageSwitcher', () => {
  it('renders properly', () => {
    const i18n = createI18n({
      legacy: false,
      locale: localStorage.getItem('lang') || 'en',
      fallbackLocale: 'pt',
      messages: {
        pt,
        en,
      },
    })

    const pinia = createPinia()

    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n, pinia],
      },
    })
    expect(wrapper.vm.$t).toBeTruthy()
  })
})
