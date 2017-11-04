import * as R from 'ramda'
import React from 'react'
import sinon from 'sinon'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import ResetPasswordForm, { FORM } from '../../../src/modules/Auth/components/ResetPasswordForm'
import authReducers from '../../../src/modules/Auth/reducers'
import { injectReducers } from '../../../src/reducers'
import * as STATE from '../../../src/constants/state'
import axios from '../../../src/helpers/axios'
import { getFormValueFromState } from '../../../src/helpers/get'
import TextField from '../../../src/components/Form/SimpleFields/TextField'
import { resetPasswordAction, API_RESET_PASSWORD_URL } from '../../../src/modules/Auth/actions/resetPassword'
import createStore from '../../../src/store'
import MuiThemeProvider from '../../MuiThemeProvider'

describe('(Component) ResetPasswordForm', () => {
  const code = 'generate-secret-code-for-reset-password'
  let submit, component, store

  beforeEach(() => {
    store = createStore({})
    injectReducers(store, authReducers)

    submit = sinon.spy(() => {
      const values = R.path(['form', FORM, 'values'], store.getState())
      return store.dispatch(resetPasswordAction(code, values))
    })

    component = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <ResetPasswordForm onSubmit={submit} />
        </MuiThemeProvider>
      </Provider>
    )

    component.find('input[name="password"]').simulate('change', { target: { value: 'secret123' } })
  })

  it('submit', () => {
    component.find('form').simulate('submit')

    const formValues = getFormValueFromState(FORM, store.getState())

    expect(submit).to.have.property('callCount', 1)
    expect(formValues.password).to.equal('secret123')
  })

  it('valid', (done) => {
    const response = {
      message: 'Your password successfully changed'
    }

    const mock = new MockAdapter(axios(store))
    mock.onPut(`${API_RESET_PASSWORD_URL}${code}/`).reply(200, response)

    component.find('form').simulate('submit')

    expect(R.path([STATE.RESET_PASSWORD, 'loading'], store.getState())).to.equal(true)

    setTimeout(() => {
      expect(R.path([STATE.RESET_PASSWORD, 'data', 'message'], store.getState())).to.equal(response.message)

      done()
    })
  })

  it('invalid', (done) => {
    const response = {
      password: ['Password is so simple.'],
    }
    const mock = new MockAdapter(axios(store))
    mock.onPut(`${API_RESET_PASSWORD_URL}${code}/`).reply(400, response)

    component.find('form').simulate('submit')

    expect(R.path([STATE.RESET_PASSWORD, 'loading'], store.getState())).to.equal(true)

    setTimeout(() => {
      expect(component.find(TextField).at(0).instance().props.meta.error[0]).to.equal(response['password'][0])

      done()
    })
  })
})
