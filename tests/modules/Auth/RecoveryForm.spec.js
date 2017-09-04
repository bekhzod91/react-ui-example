import _ from 'lodash'
import React from 'react'
import sinon from 'sinon'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'
// import { describe, beforeEach, it } from 'mocha'
import { Provider } from 'react-redux'
import RecoveryForm, { FORM } from '../../../src/modules/Auth/components/RecoveryForm'
import authReducers from '../../../src/modules/Auth/reducers'
import { injectReducers } from '../../../src/reducers'
import * as STATE from '../../../src/constants/state'
import axios from '../../../src/helpers/axios'
import TextFieldNext from '../../../src/components/Form/SimpleFields/TextFieldNext'
import { recoveryAction, API_RECOVERY_URL } from '../../../src/modules/Auth/actions/recovery'
import createStore from '../../../src/store'
import MuiThemeProvider from '../../MuiThemeProvider'

describe('(Component) RecoveryForm', () => {
  let submit, component, store

  beforeEach(() => {
    store = createStore({})
    injectReducers(store, authReducers)

    submit = sinon.spy(() => {
      const values = _.get(store.getState(), ['form', FORM, 'values'])
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

    const formValues = _.get(store.getState(), ['form', FORM, 'values'])

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

    expect(_.get(store.getState(), [STATE.RECOVERY, 'loading'])).to.equal(true)

    setTimeout(() => {
      expect(_.get(store.getState(), [STATE.RECOVERY, 'data', 'email'])).to.equal(response.email)
      expect(_.get(store.getState(), [STATE.RECOVERY, 'data', 'firstName'])).to.equal(response.firstName)
      expect(_.get(store.getState(), [STATE.RECOVERY, 'data', 'secondName'])).to.equal(response.secondName)

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

    expect(_.get(store.getState(), [STATE.RECOVERY, 'loading'])).to.equal(true)

    setTimeout(() => {
      expect(component.find(TextFieldNext).at(0).props().meta.error[0]).to.equal(response['email'][0])

      done()
    })
  })
})
