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

const API_URL = '/detail/%d'
const STATE_NAME = 'detail'
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

const wait = () =>
  new Promise(resolve => setTimeout(() => resolve()))

describe('(Component) DetailWrapper', () => {
  let history, component, store

  beforeEach(() => {
    history = createHistory()
    store = createStore(history)
    injectReducers(store, { [STATE_NAME]: createThunkReducer(ACTION_TYPE) })

    const enhance = compose(
      withRouter,
      DetailWrapper({ stateName: STATE_NAME, action })
    )
    const DetailComponent = enhance(({ item }) =>
      <div>{path(['data', 'name'], item)}</div>
    )

    component = mount(
      <WrapperProvider store={store} history={history}>
        <Route path="/detail/:id" component={DetailComponent} />
      </WrapperProvider>
    )
  })

  it('fetch', () => {
    const response = { name: 'Hello World' }
    const mock = new MockAdapter(axios(store))
    mock.onGet(sprintf(API_URL, 1)).reply(200, response)

    history.push('/')

    return Promise.resolve()
      .then(() => history.push('/detail/1/'))
      .then(wait)
      .then(() => expect(component.text()).to.be.eq('Hello World'))
  })

  it('fetch on change id', () => {
    const mock = new MockAdapter(axios(store))
    mock.onGet(sprintf(API_URL, 1)).reply(200, { name: 'First' })
    mock.onGet(sprintf(API_URL, 2)).reply(200, { name: 'Second' })

    history.push('/')

    return Promise.resolve()
      // Get detail with id 1
      .then(() => history.push('/detail/1/'))
      .then(wait)
      .then(() => expect(component.text()).to.be.eq('First'))

      // Get detail with id 2
      .then(() => history.push('/detail/2/'))
      .then(wait)
      .then(() => expect(component.text()).to.be.eq('Second'))
  })
})
