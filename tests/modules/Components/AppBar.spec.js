import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import AppBar from '../../../src/components/AppBar'
import MenuBig from '../../../src/components/Menu'
import MenuIcon from '../../../src/components/AppBar/MenuIcon'
import { setStorage } from '../../../src/helpers/localStorage'
import menus from '../../../src/constants/menus'
import * as ROUTE from '../../../src/constants/routes'
import MuiThemeProvider from '../../MuiThemeProvider'

describe('(Component) AppBar', () => {
  let props, component
  const Content = () => <div>Content</div>

  beforeEach(() => {
    props = {
      company: 'Company',
      route: {
        location: {},
        companyId: 0,
        push: sinon.spy()
      },
      profile: {
        email: 'user@example.com',
        image: null,
      },
      logout: sinon.spy(),
      menuList: menus
    }
  })

  it('renders its children inside of the viewport', () => {
    component = mount(
      <MuiThemeProvider>
        <AppBar activeMenuName={ROUTE.DASHBOARD} {...props}>
          <Content />
        </AppBar>
      </MuiThemeProvider>
    )

    expect(component.find(Content)).to.have.lengthOf(1)
  })

  it('AppBar contain MenuIcon', () => {
    setStorage('menuOpen', false)

    component = mount(
      <MuiThemeProvider>
        <AppBar activeMenuName={ROUTE.DASHBOARD} {...props}>
          <Content />
        </AppBar>
      </MuiThemeProvider>
    )

    expect(component.find(MenuIcon)).to.have.lengthOf(1)
  })

  it('AppBar contain FullMenu', () => {
    setStorage('menuOpen', true)

    component = mount(
      <MuiThemeProvider>
        <AppBar activeMenuName={ROUTE.DASHBOARD} {...props}>
          <Content />
        </AppBar>
      </MuiThemeProvider>
    )

    expect(component.find(MenuBig)).to.have.lengthOf(1)
  })

  it('render user email in FullMenu', () => {
    setStorage('menuOpen', true)

    component = mount(
      <MuiThemeProvider>
        <AppBar activeMenuName={ROUTE.DASHBOARD} {...props}>
          <Content />
        </AppBar>
      </MuiThemeProvider>
    )
    const element = component.find('#userEmail')
    expect(element.text()).to.equal(props.profile.email)
  })
})
