import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import BaseLayout from '../../src/components/Layouts/BaseLayout'
import createStore from '../../src/store'
import MuiThemeProvider from '../MuiThemeProvider'

describe('(Layout) PageLayout', () => {
  let store

  beforeEach(() => {
    store = createStore({})
  })

  it('renders as a <div>', () => {
    const Child = (appBar) => <div>Hello</div>
    const component = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <BaseLayout>
            <Child />
          </BaseLayout>
        </MuiThemeProvider>
      </Provider>
    )
    expect(component).to.have.lengthOf(1)
  })

  it('renders its children inside of the viewport', () => {
    const Child = (appBar) => <h2>child</h2>
    const component = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <BaseLayout>
            <Child />
          </BaseLayout>
        </MuiThemeProvider>
      </Provider>
    )

    expect(component.find(Child)).to.have.lengthOf(1)
  })
})
