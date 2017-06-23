import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import sinon from 'sinon'
import { mount } from 'enzyme'
import SignInSocialButtons from 'routes/Auth/components/SignInSocialButtons'
import MuiThemeProvider from '../../../MuiThemeProvider'

describe('(Component) SignInSocialButtons', () => {
  let submit, handleSocialSignIn, component

  beforeEach(() => {
    submit = sinon.spy(() => Promise.resolve())

    handleSocialSignIn = {
      handleFacebookSignIn: sinon.spy(),
      handleGooglePlusSignIn: sinon.spy(),
      handleTwitterSignIn: sinon.spy(),
    }

    component = mount(
      <MuiThemeProvider>
        <SignInSocialButtons loading={false} onSubmit={submit} handleSocialSignIn={handleSocialSignIn} />
      </MuiThemeProvider>
    )
  })

  it('facebook button touchtap event', () => {
    const element = component.find('#facebook')
    const node = ReactDOM.findDOMNode(element.node)
    ReactTestUtils.Simulate.touchTap(node)
    expect(handleSocialSignIn.handleFacebookSignIn).to.have.property('callCount', 1)
  })

  it('google plus button touchtap event', () => {
    const element = component.find('#googleplus')
    const node = ReactDOM.findDOMNode(element.node)
    ReactTestUtils.Simulate.touchTap(node)
    expect(handleSocialSignIn.handleGooglePlusSignIn).to.have.property('callCount', 1)
  })

  it('twitter button touchtap event', () => {
    const element = component.find('#twitter')
    const node = ReactDOM.findDOMNode(element.node)
    ReactTestUtils.Simulate.touchTap(node)
    expect(handleSocialSignIn.handleTwitterSignIn).to.have.property('callCount', 1)
  })
})
