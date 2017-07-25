import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import PageLayout from '../../src/components/Layouts/PageLayout'
import createStore from '../../src/store/createStore'
import MuiThemeProvider from '../MuiThemeProvider'

describe('(Layout) PageLayout', () => {
  let store

  beforeEach(() => {
    store = createStore({})
  })

  it('renders as a <div>', () => {
    const component = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <PageLayout>
            <div>Hello</div>
          </PageLayout>
        </MuiThemeProvider>
      </Provider>
    )
    expect(component).to.have.lengthOf(1)
  })

  it('renders its children inside of the viewport', () => {
    const Child = () => <h2>child</h2>
    const component = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <PageLayout>
            <Child />
          </PageLayout>
        </MuiThemeProvider>
      </Provider>
    )

    expect(component.find(Child)).to.have.lengthOf(1)
  })
})
