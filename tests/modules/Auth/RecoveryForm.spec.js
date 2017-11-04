import * as R from 'ramda'
import React from 'react'
import sinon from 'sinon'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import RecoveryForm, { FORM } from '../../../src/modules/Auth/components/RecoveryForm'
import authReducers from '../../../src/modules/Auth/reducers'
import { injectReducers } from '../../../src/reducers'
import * as STATE from '../../../src/constants/state'
import axios from '../../../src/helpers/axios'
import TextField from '../../../src/components/Form/SimpleFields/TextField'
import { recoveryAction, API_RECOVERY_URL } from '../../../src/modules/Auth/actions/recovery'
import createStore from '../../../src/store'
import MuiThemeProvider from '../../MuiThemeProvider'

describe('(Component) RecoveryForm', () => {
  let submit, component, store

  beforeEach(() => {
    store = createStore({})
    injectReducers(store, authReducers)

    submit = sinon.spy(() => {
      const values = R.path(['form', FORM, 'values'], store.getState())
      return store.dispatch(recoveryAction(values))
    })

    component = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <RecoveryForm onSubmit={submit} />
        </MuiThemeProvider>
      </Provider>
    )

    component.find('input[name="email"]').simulate('change', { target: { value: 'user@example.com' } })
  })

  it('submit', () => {
    component.find('form').simulate('submit')

    const formValues = R.path(['form', FORM, 'values'], store.getState())

    expect(submit).to.have.property('callCount', 1)
    expect(formValues.email).to.equal('user@example.com')
  })

  it('valid', (done) => {
    const response = {
      email: 'user@example.com',
      firstName: 'Jon',
      secondName: 'Smith'
    }

    const mock = new MockAdapter(axios(store))
    mock.onPut(API_RECOVERY_URL).reply(200, response)

    component.find('form').simulate('submit')

    expect(R.path([STATE.RECOVERY, 'loading'], store.getState())).to.equal(true)

    setTimeout(() => {
      expect(R.path([STATE.RECOVERY, 'data', 'email'], store.getState())).to.equal(response.email)
      expect(R.path([STATE.RECOVERY, 'data', 'firstName'], store.getState())).to.equal(response.firstName)
      expect(R.path([STATE.RECOVERY, 'data', 'secondName'], store.getState())).to.equal(response.secondName)

      done()
    })
  })

  it('invalid', (done) => {
    const response = {
      email: ['Email not correct.'],
    }
    const mock = new MockAdapter(axios(store))
    mock.onPut(API_RECOVERY_URL).reply(400, response)

    component.find('form').simulate('submit')

    expect(R.path([STATE.RECOVERY, 'loading'], store.getState())).to.equal(true)

    setTimeout(() => {
      expect(component.find(TextField).first().instance().props.meta.error[0]).to.equal(response['email'][0])

      done()
    })
  })
})
