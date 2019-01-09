import React from 'react'
import { mount } from 'enzyme'
import Editor from '../../src/editor'

const setup = () => {
  const props = {
    onChange: jest.fn()
  }

  const wrapper = mount(<Editor {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Editor', () => {
  it('textarea change', () => {
    const { wrapper, props } = setup()
    wrapper.find('textarea').simulate('change', { target: { value: 'value' } })
    expect(props.onChange).toBeCalled()
  })

  it('unmount', () => {
    const { wrapper } = setup()
    wrapper.unmount()
  })
})
