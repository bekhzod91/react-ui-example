import { mount } from 'enzyme'
import MockAdapter from 'axios-mock-adapter'
import sinon from 'sinon'
import React from 'react'
import { path } from 'ramda'
import SignUpForm, { FORM } from '../../../src/modules/Auth/components/SignUpForm'
import authReducers from '../../../src/modules/Auth/reducers'
import { injectReducers } from '../../../src/store/reducers'
import * as STATE from '../../../src/constants/states'
import axios from '../../../src/helpers/axios'
import { getFormValueFromState } from '../../../src/helpers/form'
import TextField from '../../../src/components/Form/TextField'
import { signUpAction, API_SIGN_UP_URL } from '../../../src/modules/Auth/actions/signUp'
import createStore from '../../../src/store/createStore'
import WrapperProvider from '../../WrapperProvider'
import FormHelperText from "@material-ui/core/FormHelperText/index";

describe('(Component) SignUpForm', () => {
  let submit, component, store

  beforeEach(() => {
    store = createStore({})
    injectReducers(store, authReducers)

    submit = sinon.spy(() => {
      const values = getFormValueFromState(FORM, store.getState())
      return store.dispatch(signUpAction(values))
    })

    component = mount(
      <WrapperProvider store={store}>
        <SignUpForm onSubmit={submit} />
      </WrapperProvider>
    )

    component.find('input[name="email"]').simulate('change', { target: { value: 'user@example.com' } })
    component.find('input[name="firstName"]').simulate('change', { target: { value: 'First' } })
    component.find('input[name="secondName"]').simulate('change', { target: { value: 'Second' } })
    component.find('input[name="password"]').simulate('change', { target: { value: 'password' } })
  })

  it('submit', () => {
    component.find('form').simulate('submit')

    const formValues = getFormValueFromState(FORM, store.getState())

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

    expect(path([STATE.SIGN_UP, 'loading'], store.getState())).to.equal(true)

    setTimeout(() => {
      expect(path([STATE.SIGN_UP, 'data', 'token'], store.getState())).to.equal(response.token)

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

    expect(path([STATE.SIGN_UP, 'loading'], store.getState())).to.equal(true)

    setTimeout(() => {
      expect(component.find(FormHelperText).at(0).instance().props.children[0]).to.equal(response['email'][0])
      expect(component.find(FormHelperText).at(1).instance().props.children[0]).to.equal(response['firstName'][0])
      expect(component.find(FormHelperText).at(2).instance().props.children[0]).to.equal(response['secondName'][0])
      expect(component.find(FormHelperText).at(3).instance().props.children[0]).to.equal(response['password'][0])

      done()
    })
  })
})
