<% if (frontEndChoice === "vue") {%>
import { mount } from '@vue/test-utils'
import App from './../src/App.vue'

describe('Mounted App', () => {
  const wrapper = mount(App);

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
<%}%>
  
<% if (frontEndChoice === "react") {%>
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from '../App'
test("renders learn react link", () => {
  render(<App />);

  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
<%}%>
