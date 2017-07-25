import _ from 'lodash'
import React from 'react'
import sinon from 'sinon'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import SignInForm from '../../../src/routes/Auth/components/SignInForm'
import * as STATE from '../../../src/constants/state'
import axios from '../../../src/helpers/axios'
import TextField from '../../../src/components/Form/SimpleFields/TextField'
import { signInAction, API_SIGN_IN_URL } from '../../../src/routes/Auth/actions/signIn'
import createStore from '../../../src/store/createStore'
import MuiThemeProvider from '../../MuiThemeProvider'

describe('(Component) SignInForm', () => {
  let submit, component, store

  beforeEach(() => {
    store = createStore({})

    submit = sinon.spy(() => {
      const values = _.get(store.getState(), ['form', 'SignInForm', 'values'])
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

    const formValues = _.get(store.getState(), ['form', 'SignInForm', 'values'])

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

    expect(_.get(store.getState(), [STATE.SING_IN, 'loading'])).to.equal(true)

    setTimeout(() => {
      expect(_.get(store.getState(), [STATE.SING_IN, 'data', 'token'])).to.equal(response.token)

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

    expect(_.get(store.getState(), [STATE.SING_IN, 'loading'])).to.equal(true)

    setTimeout(() => {
      expect(component.find(TextField).at(0).props().meta.error[0]).to.equal(response['email'][0])
      expect(component.find(TextField).at(1).props().meta.error[0]).to.equal(response['password'][0])

      done()
    })
  })
})
