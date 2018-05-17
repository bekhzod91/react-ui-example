import { mount } from 'enzyme'
import MockAdapter from 'axios-mock-adapter'
import sinon from 'sinon'
import React from 'react'
import * as R from 'ramda'
import FormHelperText from '@material-ui/core/FormHelperText'
import RecoveryForm, { FORM } from '../../../src/modules/Auth/components/RecoveryForm'
import authReducers from '../../../src/modules/Auth/reducers'
import { injectReducers } from '../../../src/store/reducers'
import * as STATE from '../../../src/constants/states'
import axios from '../../../src/helpers/axios'
import { recoveryAction, API_RECOVERY_URL } from '../../../src/modules/Auth/actions/recovery'
import createStore from '../../../src/store/createStore'
import WrapperProvider from '../../WrapperProvider'

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
      <WrapperProvider store={store}>
        <RecoveryForm onSubmit={submit} />
      </WrapperProvider>
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
      expect(component.find(FormHelperText).first().instance().props.children[0]).to.equal(response['email'][0])

      done()
    })
  })
})
