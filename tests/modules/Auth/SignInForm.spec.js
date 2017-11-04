import * as R from 'ramda'
import React from 'react'
import sinon from 'sinon'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import SignInForm, { FORM } from '../../../src/modules/Auth/components/SignInForm'
import * as STATE from '../../../src/constants/state'
import axios from '../../../src/helpers/axios'
import { getFormValueFromState } from '../../../src/helpers/get'
import TextField from '../../../src/components/Form/SimpleFields/TextField'
import { signInAction, API_SIGN_IN_URL } from '../../../src/modules/Auth/actions/signIn'
import createStore from '../../../src/store'
import MuiThemeProvider from '../../MuiThemeProvider'

describe('(Component) SignInForm', () => {
  let submit, component, store

  beforeEach(() => {
    store = createStore({})

    submit = sinon.spy(() => {
      const values = getFormValueFromState(FORM, store.getState())
      return store.dispatch(signInAction(values))
    })

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
  })

  it('submit', () => {
    component.find('form').simulate('submit')

    const formValues = getFormValueFromState(FORM, store.getState())

    expect(submit).to.have.property('callCount', 1)
    expect(formValues.email).to.equal('user@example.com')
    expect(formValues.password).to.equal('password')
    expect(formValues.rememberMe).to.equal(true)
  })

  it('valid', (done) => {
    const response = { token: 'token' }
    const mock = new MockAdapter(axios(store))
    mock.onPost(API_SIGN_IN_URL).reply(200, response)

    component.find('form').simulate('submit')

    expect(R.path([STATE.SING_IN, 'loading'], store.getState())).to.equal(true)

    setTimeout(() => {
      expect(R.path([STATE.SING_IN, 'data', 'token'], store.getState())).to.equal(response.token)

      done()
    })
  })

  it('invalid', (done) => {
    const response = {
      email: ['Email already exists.'],
      password: ['Password must contain symbol and number.']
    }
    const mock = new MockAdapter(axios(store))
    mock.onPost(API_SIGN_IN_URL).reply(400, response)

    component.find('form').simulate('submit')

    expect(R.path([STATE.SING_IN, 'loading'], store.getState())).to.equal(true)

    setTimeout(() => {
      expect(component.find(TextField).at(0).instance().props.meta.error[0]).to.equal(response['email'][0])
      expect(component.find(TextField).at(1).instance().props.meta.error[0]).to.equal(response['password'][0])

      done()
    })
  })
})
