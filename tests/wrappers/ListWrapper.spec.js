import { path } from 'ramda'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'
import { withRouter, Route } from 'react-router'
import { compose } from 'recompose'
import createHistory from 'history/createBrowserHistory'
import { injectReducers } from '../../src/store/reducers'
import createThunkReducer from '../../src/helpers/thunkReducer'
import createStore from '../../src/store/createStore'
import axios, { getPayloadFromError, getPayloadFromSuccess } from '../../src/helpers/axios'
import ListWrapper from '../../src/wrappers/ListWrapper'
import WrapperProvider from '../WrapperProvider'
import { wait } from '../helpers'

const API_URL = '/list/'
const LIST_STATE = 'list'
const ACTION_TYPE = 'LIST'
const action = params => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API_URL, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: ACTION_TYPE,
      payload
    })
  }
}

describe('(Wrapper) ListWrapper', () => {
  let history, wrapper, store

  beforeEach(() => {
    history = createHistory()
    store = createStore(history)
    injectReducers(store, { [LIST_STATE]: createThunkReducer(ACTION_TYPE) })

    history.push('/')

    const enhance = compose(
      withRouter,
      ListWrapper({ stateName: LIST_STATE, action })
    )
    const ListComponent = enhance(({ list }) => {
      const items = path(['data', 'results'], list) || []

      return (
        <div>
          {items.map((item, idx) => <span key={idx}>{item}</span>)}
        </div>
      )
    })

    wrapper = mount(
      <WrapperProvider store={store} history={history}>
        <Route path="/list/" render={ListComponent} />
      </WrapperProvider>
    )
  })

  it('get list', () => {
    const mock = new MockAdapter(axios(store))

    return Promise.resolve()
      .then(() => {
        const response = { count: 2, results: ['Hello', 'World'] }
        mock.onGet(API_URL).reply(200, response)

        history.push('/list/')
      })
      .then(wait)
      .then(() => {
        wrapper.update()
        expect(wrapper.find('span').at(0).text()).to.be.eq('Hello')
        expect(wrapper.find('span').at(1).text()).to.be.eq('World')
      })
  })

  it('get list by page', () => {
    const mock = new MockAdapter(axios(store))

    return Promise.resolve()
      // Get page 1
      .then(() => {
        const params = { page: 1 }
        const response = { count: 2, results: ['First', 'Second'] }
        mock.onGet(API_URL, { params }).reply(200, response)

        history.push('/list/?page=1')
      })
      .then(wait)
      .then(() => {
        wrapper.update()
        expect(wrapper.find('span').at(0).text()).to.be.eq('First')
        expect(wrapper.find('span').at(1).text()).to.be.eq('Second')
      })

      // Get page 2
      .then(() => {
        const params = { page: 2 }
        const response = { count: 3, results: ['Third', 'Fourth', 'Fifth'] }
        mock.onGet(API_URL, { params }).reply(200, response)

        history.push(`/list/?page=2`)
      })
      .then(wait)
      .then(() => {
        wrapper.update()
        expect(wrapper.find('span').at(0).text()).to.be.eq('Third')
        expect(wrapper.find('span').at(1).text()).to.be.eq('Fourth')
        expect(wrapper.find('span').at(2).text()).to.be.eq('Fifth')
      })
  })
})
