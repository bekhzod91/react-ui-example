import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import sinon from 'sinon'
import { mount } from 'enzyme'
import SocialButtons from '../../../src/modules/Auth/components/SocialButtons'
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

  it('facebook button click event', () => {
    const facebookButton = component.find('#facebook').first()
    facebookButton.simulate('click')

    expect(facebookButton.text()).to.equal('SignIn with Facebook')
    expect(buttons.facebook.handle).to.have.property('callCount', 1)
  })

  it('google plus button click event', () => {
    const googleButton = component.find('#googleplus').first()
    googleButton.simulate('click')

    expect(googleButton.text()).to.equal('SignIn with Google')
    expect(buttons.google.handle).to.have.property('callCount', 1)
  })

  it('twitter button touchtap event', () => {
    const twitterButton = component.find('#twitter').first()
    twitterButton.simulate('click')

    expect(twitterButton.text()).to.equal('SignIn with Twitter')
    expect(buttons.twitter.handle).to.have.property('callCount', 1)
  })
})
