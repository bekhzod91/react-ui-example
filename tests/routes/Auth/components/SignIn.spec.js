import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import sinon from 'sinon'
import { mount } from 'enzyme'
import SignIn from 'routes/Auth/components/SignIn'
import createStore from 'store/createStore'
import { Provider } from 'react-redux'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import MuiThemeProvider from '../../../MuiThemeProvider'

describe('(Component) SignIn', () => {
  let submit, handleSocialSignIn, component, store

  beforeEach(() => {
    store = createStore({})

    submit = sinon.spy(() => Promise.resolve())

    handleSocialSignIn = {
      handleFacebookSignIn: sinon.spy(),
      handleGooglePlusSignIn: sinon.spy(),
      handleTwitterSignIn: sinon.spy(),
    }

    component = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <SignIn loading={false} onSubmit={submit} handleSocialSignIn={handleSocialSignIn} />
        </MuiThemeProvider>
      </Provider>
    )
  })

  it('form submit event', () => {
    const mock = new MockAdapter(axios)
    mock.onPost('/user/auth/').reply(200, {
      email: 'Work'
    })

    component.find('input[name="email"]').simulate('change', { target: { value: 'user@example.com' } })
    component.find('input[name="password"]').simulate('change', { target: { value: 'password' } })
    component.find('input[type="checkbox"]').simulate('change', { target: { value: true } })

    component.find('form').simulate('submit')

    const formValues = _.get(store.getState(), ['form', 'SignInForm', 'values'])

    expect(submit).to.have.property('callCount', 1)
    expect(formValues.email).to.equal('user@example.com')
    expect(formValues.password).to.equal('password')
    expect(formValues.rememberMe).to.equal(true)
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
