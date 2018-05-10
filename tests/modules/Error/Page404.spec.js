import React from 'react'
import Button from 'material-ui/Button'
import sinon from 'sinon'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Page404 from '../../../src/modules/Error/components/Page404'
import createStore from '../../../src/store/createStore'
import WrapperProvider from '../../WrapperProvider'

describe('(Component) Page404', () => {
  let onGoHome, component, store

  beforeEach(() => {
    store = createStore({})
    onGoHome = sinon.spy()

    component = mount(
      <Provider store={store}>
        <WrapperProvider>
          <Page404 onGoHome={onGoHome} />
        </WrapperProvider>
      </Provider>
    )
  })

  it('call should work when click home', () => {
    component.find(Button).at(0).simulate('click')
    expect(onGoHome).to.have.property('callCount', 1)
  })
})
