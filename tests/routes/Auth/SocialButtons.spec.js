import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import sinon from 'sinon'
import { mount } from 'enzyme'
import SocialButtons from '../../../src/routes/Auth/components/SocialButtons'
import MuiThemeProvider from '../../MuiThemeProvider'

describe('(Component) SignInSocialButtons', () => {
  let buttons, component

  beforeEach(() => {
    buttons = {
      facebook: {
        label: 'SignIn with Facebook',
        handle: sinon.spy(),
      },
      google: {
        label: 'SignIn with Google',
        handle: sinon.spy(),
      },
      twitter: {
        label: 'SignIn with Twitter',
        handle: sinon.spy(),
      }
    }

    component = mount(
      <MuiThemeProvider>
        <SocialButtons buttons={buttons} />
      </MuiThemeProvider>
    )
  })

  it('facebook button touchtap event', () => {
    const element = component.find('#facebook')
    const node = ReactDOM.findDOMNode(element.node)
    ReactTestUtils.Simulate.onClick(node)
    console.log(element.text())
    expect(element.text()).to.equal('SignIn with Facebook')
    expect(buttons.facebook.handle).to.have.property('callCount', 1)
  })

  it('google plus button touchtap event', () => {
    const element = component.find('#googleplus')
    const node = ReactDOM.findDOMNode(element.node)
    ReactTestUtils.Simulate.onClick(node)
    expect(element.text()).to.equal('SignIn with Google')
    expect(buttons.google.handle).to.have.property('callCount', 1)
  })

  it('twitter button touchtap event', () => {
    const element = component.find('#twitter')
    const node = ReactDOM.findDOMNode(element.node)
    ReactTestUtils.Simulate.onClick(node)
    expect(element.text()).to.equal('SignIn with Twitter')
    expect(buttons.twitter.handle).to.have.property('callCount', 1)
  })
})
