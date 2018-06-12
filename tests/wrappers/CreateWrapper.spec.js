import { compose, path } from 'ramda'
import React from 'react'
import { reduxForm, Field } from 'redux-form'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'
import { withRouter, Route } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { injectReducers } from '../../src/store/reducers'
import createThunkReducer from '../../src/helpers/thunkReducer'
import createStore from '../../src/store/createStore'
import axios, { getPayloadFromError, getPayloadFromSuccess } from '../../src/helpers/axios'
import CreateWrapper from '../../src/wrappers/CreateWrapper'
import { SNACKBAR_STATE } from '../../src/components/Snackbar/reducer'
import { DANGER_TYPE, SUCCESS_TYPE } from '../../src/components/Snackbar/actions'
import WrapperProvider from '../WrapperProvider'
import { wait } from '../helpers'

const form = 'CreateWrapperForm'
const fields = ['name']
const API_URL = '/create'
const CREATE_STATE = 'create'
const ACTION_TYPE = 'CREATE'
const action = data => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(API_URL, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: ACTION_TYPE,
      payload
    })
  }
}
const listAction = () =>
  ({ type: 'FETCH_LIST' })

describe('(Wrapper) CreateWrapper', () => {
  let history, wrapper, store

  beforeEach(() => {
    history = createHistory()
    store = createStore(history)
    injectReducers(store, { [CREATE_STATE]: createThunkReducer(ACTION_TYPE) })

    history.push('/create')

    const enhance = compose(
      withRouter,
      CreateWrapper({ form, fields, action, listAction }),
      reduxForm({ form, enableReinitialize: true })
    )
    const CreateComponent = enhance(({ create, handleSubmit }) => {
      return (
        <form onSubmit={handleSubmit(create.onSubmitModal)}>
          <Field name="name" component="input" />
          <button type="submit">Submit</button>
        </form>
      )
    })

    wrapper = mount(
      <WrapperProvider store={store} history={history}>
        <Route path="/create" component={CreateComponent} />
      </WrapperProvider>
    )

    wrapper.find('input').simulate('change', { target: { value: 'My name' } })
  })

  it('success', () => {
    const mock = new MockAdapter(axios(store))
    const response = { id: 1, name: 'Name' }
    mock.onPost(API_URL).reply(200, response)

    wrapper.find('form').simulate('submit')

    return Promise.resolve()
      .then(wait)
      .then(() => {
        const state = store.getState()

        expect(path([CREATE_STATE, 'data', 'id'], state)).to.be.eq(response.id)
        expect(path([CREATE_STATE, 'data', 'name'], state)).to.be.eq(response.name)

        expect(path([SNACKBAR_STATE, 'open'], state)).to.be.eq(true)
        expect(path([SNACKBAR_STATE, 'action'], state)).to.be.eq(SUCCESS_TYPE)
      })
  })

  it('fail', () => {
    const mock = new MockAdapter(axios(store))
    const response = { name: ['This field required.'] }
    mock.onPost(API_URL).reply(400, response)

    wrapper.find('form').simulate('submit')

    return Promise.resolve()
      .then(wait)
      .then(() => {
        const state = store.getState()

        expect(path([CREATE_STATE, 'error', 'name'], state)).to.be.eql(response.name)

        expect(path([SNACKBAR_STATE, 'open'], state)).to.be.eq(true)
        expect(path([SNACKBAR_STATE, 'action'], state)).to.be.eq(DANGER_TYPE)
      })
  })
})
