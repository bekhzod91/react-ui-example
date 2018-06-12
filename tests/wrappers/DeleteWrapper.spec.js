import { path } from 'ramda'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'
import { withRouter, Route } from 'react-router'
import { compose } from 'recompose'
import createHistory from 'history/createBrowserHistory'
import sprintf from 'sprintf'
import { injectReducers } from '../../src/store/reducers'
import createThunkReducer from '../../src/helpers/thunkReducer'
import createStore from '../../src/store/createStore'
import axios, { getPayloadFromError, getPayloadFromSuccess } from '../../src/helpers/axios'
import DeleteWrapper from '../../src/wrappers/DeleteWrapper'
import ConfirmDialog from '../../src/components/ConfirmDialog'
import { CONFIRM_DIALOG_STATE } from '../../src/components/ConfirmDialog/reducer'
import { SNACKBAR_STATE } from '../../src/components/Snackbar/reducer'
import AppLayout from '../../src/components/Layouts/AppLayout'
import WrapperProvider from '../WrapperProvider'
import { wait } from '../helpers'

const API_URL = '/delete/%d'
const DELETE_STATE = 'delete'
const ACTION_TYPE = 'DELETE'
const action = id => {
  const url = sprintf(API_URL, id)

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .delete(url)
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

describe('(Wrapper) DeleteWrapper', () => {
  let history, wrapper, store

  beforeEach(() => {
    history = createHistory()
    store = createStore(history)
    injectReducers(store, { [DELETE_STATE]: createThunkReducer(ACTION_TYPE) })

    history.push('/')

    const enhance = compose(
      withRouter,
      DeleteWrapper({ action, listAction })
    )
    const DeleteComponent = enhance(({ remove }) => (
      <div>
        <button onClick={() => remove.openConfirmDialog({ id: 1 })}>Delete</button>
      </div>
    ))

    wrapper = mount(
      <WrapperProvider store={store} history={history}>
        <Route path="/delete/" render={props =>
          React.createElement(AppLayout, props, React.createElement(DeleteComponent, props))
        } />
      </WrapperProvider>
    )
  })

  it('success', () => {
    const mock = new MockAdapter(axios(store))
    const url = sprintf(API_URL, 1)
    mock.onDelete(url).reply(204)

    history.push('/delete/')
    wrapper.update()

    return Promise.resolve()
      .then(() => wrapper.find('button').simulate('click'))
      .then(wait)
      .then(() => {
        const state = store.getState()
        expect(path([CONFIRM_DIALOG_STATE, 'open'], state)).to.be.eq(true)

        wrapper
          .find(ConfirmDialog)
          .find('button[test="confirm-dialog-confirm"]')
          .simulate('click')
      })
      .then(wait)
      .then(() => {
        const state = store.getState()

        expect(path([CONFIRM_DIALOG_STATE, 'open'], state)).to.be.eq(false)
        expect(path([DELETE_STATE, 'success'], state)).to.be.eq(true)
      })
  })

  it('fail', () => {
    const mock = new MockAdapter(axios(store))
    const url = sprintf(API_URL, 1)
    mock.onDelete(url).reply(400, { nonFieldError: ['Permission denied'] })

    history.push('/delete/')
    wrapper.update()

    return Promise.resolve()
      .then(() => wrapper.find('button').simulate('click'))
      .then(wait)
      .then(() => {
        const state = store.getState()
        expect(path([CONFIRM_DIALOG_STATE, 'open'], state)).to.be.eq(true)

        wrapper.update()
        wrapper
          .find(ConfirmDialog)
          .find('button[test="confirm-dialog-confirm"]')
          .last()
          .simulate('click')
      })
      .then(wait)
      .then(() => {
        const state = store.getState()

        expect(path([CONFIRM_DIALOG_STATE, 'open'], state)).to.be.eq(false)
        expect(path([SNACKBAR_STATE, 'open'], state)).to.be.eq(true)
        expect(path([DELETE_STATE, 'failed'], state)).to.be.eq(true)
      })
  })
})
