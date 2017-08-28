import _ from 'lodash'
import React from 'react'
import sinon from 'sinon'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import SignUpForm, { FORM } from '../../../src/routes/Auth/components/SignUpForm'
import authReducers from '../../../src/routes/Auth/reducers'
import { injectReducers } from '../../../src/reducers'
import * as STATE from '../../../src/constants/state'
import axios from '../../../src/helpers/axios'
import TextFieldNext from '../../../src/components/Form/SimpleFields/TextFieldNext'
import { signUpAction, API_SIGN_UP_URL } from '../../../src/routes/Auth/actions/signUp'
import createStore from '../../../src/store/createStore.js'
import MuiThemeProvider from '../../MuiThemeProvider'

describe('(Component) SignUpForm', () => {
  let submit, component, store

  beforeEach(() => {
    store = createStore({})
    injectReducers(store, authReducers)

    submit = sinon.spy(() => {
      const values = _.get(store.getState(), ['form', FORM, 'values'])
      return store.dispatch(signUpAction(values))
    })

    component = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <SignUpForm onSubmit={submit} />
        </MuiThemeProvider>
      </Provider>
    )

    component.find('input[name="email"]').simulate('change', { target: { value: 'user@example.com' } })
    component.find('input[name="firstName"]').simulate('change', { target: { value: 'First' } })
    component.find('input[name="secondName"]').simulate('change', { target: { value: 'Second' } })
    component.find('input[name="password"]').simulate('change', { target: { value: 'password' } })
  })

  it('submit', () => {
    component.find('form').simulate('submit')

    const formValues = _.get(store.getState(), ['form', FORM, 'values'])

    expect(submit).to.have.property('callCount', 1)
    expect(formValues.email).to.equal('user@example.com')
    expect(formValues.firstName).to.equal('First')
    expect(formValues.secondName).to.equal('Second')
    expect(formValues.password).to.equal('password')
  })

  it('valid', (done) => {
    const response = { token: 'token' }
    const mock = new MockAdapter(axios(store))
    mock.onPost(API_SIGN_UP_URL).reply(200, response)

    component.find('form').simulate('submit')

    expect(_.get(store.getState(), [STATE.SIGN_UP, 'loading'])).to.equal(true)

    setTimeout(() => {
      expect(_.get(store.getState(), [STATE.SIGN_UP, 'data', 'token'])).to.equal(response.token)

      done()
    })
  })

  it('invalid', (done) => {
    const response = {
      email: ['Email already exists.'],
      firstName: ['Email already exists.'],
      secondName: ['Email already exists.'],
      password: ['Password must contain symbol and number.']
    }
    const mock = new MockAdapter(axios(store))
    mock.onPost(API_SIGN_UP_URL).reply(400, response)

    component.find('form').simulate('submit')

    expect(_.get(store.getState(), [STATE.SIGN_UP, 'loading'])).to.equal(true)

    setTimeout(() => {
      expect(component.find(TextFieldNext).at(0).props().meta.error[0]).to.equal(response['email'][0])
      expect(component.find(TextFieldNext).at(1).props().meta.error[0]).to.equal(response['firstName'][0])
      expect(component.find(TextFieldNext).at(2).props().meta.error[0]).to.equal(response['secondName'][0])
      expect(component.find(TextFieldNext).at(3).props().meta.error[0]).to.equal(response['password'][0])

      done()
    })
  })
})
