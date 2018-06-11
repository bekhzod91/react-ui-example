import { compose, path } from 'ramda'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'
import { withRouter, Route } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import sprintf from 'sprintf'
import { injectReducers } from '../../src/store/reducers'
import createThunkReducer from '../../src/helpers/thunkReducer'
import createStore from '../../src/store/createStore'
import axios, { getPayloadFromError, getPayloadFromSuccess } from '../../src/helpers/axios'
import DetailWrapper from '../../src/wrappers/DetailWrapper'
import WrapperProvider from '../WrapperProvider'
import { wait } from '../helpers'

const API_URL = '/detail/%d'
const DETAIL_STATE = 'detail'
const ACTION_TYPE = 'DETAIL'
const action = id => {
  const url = sprintf(API_URL, id)

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(url)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: ACTION_TYPE,
      payload
    })
  }
}

describe('(Wrapper) DetailWrapper', () => {
  let history, wrapper, store

  beforeEach(() => {
    history = createHistory()
    store = createStore(history)
    injectReducers(store, { [DETAIL_STATE]: createThunkReducer(ACTION_TYPE) })

    history.push('/')

    const enhance = compose(
      withRouter,
      DetailWrapper({ stateName: DETAIL_STATE, action })
    )
    const DetailComponent = enhance(({ item }) =>
      <div>
        <h1>{path(['data', 'id'], item)}</h1>
        <span>{path(['data', 'name'], item)}</span>
      </div>
    )

    wrapper = mount(
      <WrapperProvider store={store} history={history}>
        <Route path="/detail/:id" component={DetailComponent} />
      </WrapperProvider>
    )
  })

  it('get item', () => {
    const mock = new MockAdapter(axios(store))

    return Promise.resolve()
      .then(() => {
        const url = sprintf(API_URL, 1)
        const response = { id: 1, name: 'Hello World' }
        mock.onGet(url).reply(200, response)

        history.push('/detail/1')
      })
      .then(wait)
      .then(() => {
        wrapper.update()
        expect(wrapper.find('h1').at(0).text()).to.be.eq('1')
        expect(wrapper.find('span').text()).to.be.eq('Hello World')
      })
  })

  it('get item on change id', () => {
    const mock = new MockAdapter(axios(store))

    return Promise.resolve()
      // Get detail with id 1
      .then(() => {
        const url = sprintf(API_URL, 1)
        const response = { id: 1, name: 'First' }
        mock.onGet(url).reply(200, response)

        history.push('/detail/1/')
      })
      .then(wait)
      .then(() => {
        wrapper.update()
        expect(wrapper.find('h1').at(0).text()).to.be.eq('1')
        expect(wrapper.find('span').text()).to.be.eq('First')
      })

      // Get detail with id 2
      .then(() => {
        const url = sprintf(API_URL, 2)
        const response = { id: 2, name: 'Second' }
        mock.onGet(url).reply(200, response)

        history.push('/detail/2/')
      })
      .then(wait)
      .then(() => {
        wrapper.update()
        expect(wrapper.find('h1').text()).to.be.eq('2')
        expect(wrapper.find('span').text()).to.be.eq('Second')
      })
  })
})
