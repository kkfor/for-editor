import React from 'react'
import { mount } from 'enzyme'
import Editor from '../../src/editor'

beforeAll(() => {
  const div = document.createElement('div')
  window.domNode = div
  document.body.appendChild(div)
})

test('didMount', () => {
  const props = {
    onChange: jest.fn()
  }
  const wrapper = mount(<Editor {...props} />)
  wrapper.find('textarea').simulate('change', { target: { value: 'value' } })
  expect(props.onChange).toBeCalled()

  wrapper.unmount()
})
