import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import sinon from 'sinon'
import { mount } from 'enzyme'
import SignIn from 'routes/Auth/components/SignIn'
import MuiThemeProvider from '../../../MuiThemeProvider'

describe('(Component) SignIn', () => {
  let submit, socialSignIn, component

  beforeEach(() => {
    submit = sinon.spy()
    socialSignIn = {
      facebookSignIn: sinon.spy(),
      googlePlusSignIn: sinon.spy(),
      twitterSignIn: sinon.spy()
    }

    component = mount(
      <MuiThemeProvider>
        <SignIn onSubmit={submit} socialSignIn={socialSignIn} />
      </MuiThemeProvider>
    )
  })

  it('form submit event', () => {
    component.find('form').simulate('submit')
    expect(submit).to.have.property('callCount', 1)
  })

  it('facebook button touchtap event', () => {
    const element = component.find('#facebook')
    const node = ReactDOM.findDOMNode(element.node)
    ReactTestUtils.Simulate.touchTap(node)
    expect(socialSignIn.facebookSignIn).to.have.property('callCount', 1)
  })

  it('google plus button touchtap event', () => {
    const element = component.find('#googleplus')
    const node = ReactDOM.findDOMNode(element.node)
    ReactTestUtils.Simulate.touchTap(node)
    expect(socialSignIn.googlePlusSignIn).to.have.property('callCount', 1)
  })

  it('twitter button touchtap event', () => {
    const element = component.find('#twitter')
    const node = ReactDOM.findDOMNode(element.node)
    ReactTestUtils.Simulate.touchTap(node)
    expect(socialSignIn.twitterSignIn).to.have.property('callCount', 1)
  })
})
