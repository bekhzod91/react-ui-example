import React from 'react'
import sinon from 'sinon'
import SignIn from 'routes/Auth/components/SignIn'
import { shallow } from 'enzyme'

describe('(Component) SignIn', () => {
  it('simulates click events', () => {
    const callback = sinon.spy()
    const wrapper = shallow(
      <SignIn onSubmit={callback} />
    )
    wrapper.find('#signInButton').simulate('click')
    expect(callback).to.have.property('callCount', 1)
  })
})
