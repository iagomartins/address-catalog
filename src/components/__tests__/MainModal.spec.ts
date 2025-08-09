import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MainModal from '../MainModal.vue'
import { createI18n } from 'vue-i18n'
import en from '@/lang/en/en.json'
import pt from '@/lang/pt/pt.json'

describe('MainModal', () => {
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

    const wrapper = mount(MainModal, {
      global: {
        plugins: [i18n],
      },
    })
    expect(wrapper.vm.$t).toBeTruthy()
  })
})
