import { mount } from '@vue/test-utils'
import App from './../src/App.vue'

describe('Mounted App', () => {
  const wrapper = mount(App);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
