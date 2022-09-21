import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import App from './../../src/App.vue'

describe('Mounted App', () => {
  it('does a wrapper exists', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.exists()).to.be.true
  })
})