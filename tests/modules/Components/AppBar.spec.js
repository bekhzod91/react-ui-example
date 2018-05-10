import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import AppBar from '../../../src/components/AppBar'
import MenuHeader from '../../../src/components/Menu/MenuHeader'
import MenuIcon from '../../../src/components/Menu/MenuIcon'
import { setStorage } from '../../../src/helpers/localStorage'
import * as ROUTE from '../../../src/constants/routes'
import WrapperProvider from '../../WrapperProvider'

describe('(Component) AppBar', () => {
  let props, component
  const Content = () => <div>Content</div>

  beforeEach(() => {
    props = {
      username: 'Admin',
      logout: sinon.spy(),
      permissions: [],
    }
  })

  it('renders its children inside of the viewport', () => {
    component = mount(
      <WrapperProvider>
        <AppBar active={ROUTE.DASHBOARD} {...props}>
          <Content />
        </AppBar>
      </WrapperProvider>
    )

    expect(component.find(Content)).to.have.lengthOf(1)
  })

  it('AppBar contain MenuIcon', () => {
    setStorage('openMenu', false)

    component = mount(
      <WrapperProvider>
        <AppBar active={ROUTE.DASHBOARD} {...props}>
          <Content />
        </AppBar>
      </WrapperProvider>
    )

    expect(component.find(MenuIcon)).to.have.lengthOf(1)
  })

  it('AppBar contain FullMenu', () => {
    setStorage('openMenu', true)

    component = mount(
      <WrapperProvider>
        <AppBar active={ROUTE.DASHBOARD} {...props}>
          <Content />
        </AppBar>
      </WrapperProvider>
    )

    expect(component.find(MenuHeader)).to.have.lengthOf(1)
  })

  it('render username in FullMenu', () => {
    setStorage('openMenu', true)

    component = mount(
      <WrapperProvider>
        <AppBar active={ROUTE.DASHBOARD} {...props}>
          <Content />
        </AppBar>
      </WrapperProvider>
    )
    const element = component.find('#username')
    expect(element.text()).to.equal(props.username)
  })
})
