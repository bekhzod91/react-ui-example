import _ from 'lodash'
import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import SignInForm from 'routes/Auth/components/SignInForm'
import TextField from 'components/Form/SimpleFields/TextField'
import axios from 'helpers/axios'
import MockAdapter from 'axios-mock-adapter'
import { singInAction, API_SIGN_IN_URL, default as reducer } from 'routes/Auth/modules/signIn'
import createStore from 'store/createStore'
import { injectReducer } from 'store/reducers'
import { Provider } from 'react-redux'
import MuiThemeProvider from '../../../MuiThemeProvider'

describe('(Component) SignInForm', () => {
  let submit, component, store
  const response = {
    email: ['Email already exists.'],
    password: ['Password must contain symbol and number.']
  }

  it('form submit event', (done) => {
    store = createStore({})
    injectReducer(store, { key: 'signIn', reducer })

    submit = sinon.spy(() => {
      const values = _.get(store.getState(), ['form', 'SignInForm', 'values'])
      return store.dispatch(singInAction(values))
    })

    const mock = new MockAdapter(axios())

    // Mock any GET request to /users
    // arguments for reply are (status, data, headers)
    mock.onPost(API_SIGN_IN_URL).reply(400, response)

    component = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <SignInForm onSubmit={submit} />
        </MuiThemeProvider>
      </Provider>
    )

    component.find('input[name="email"]').simulate('change', { target: { value: 'user@example.com' } })
    component.find('input[name="password"]').simulate('change', { target: { value: 'password' } })
    component.find('input[type="checkbox"]').simulate('change', { target: { value: true } })

    component.find('form').simulate('submit')

    const formValues = _.get(store.getState(), ['form', 'SignInForm', 'values'])

    expect(submit).to.have.property('callCount', 1)
    expect(formValues.email).to.equal('user@example.com')
    expect(formValues.password).to.equal('password')
    expect(formValues.rememberMe).to.equal(true)
    expect(_.get(store.getState(), ['signIn', 'loading'])).to.equal(true)

    setTimeout(() => {
      expect(component.find(TextField).at(0).props().meta.error[0]).to.equal(response['email'][0])
      expect(component.find(TextField).at(1).props().meta.error[0]).to.equal(response['password'][0])

      done()
    })
  })
})
