import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppLoading from '../AppLoading.vue'

describe('AppLoading', () => {
  it('renders properly', () => {
    const wrapper = mount(AppLoading)
    expect(wrapper.text()).toContain('')
  })
})
