import React from 'react'
import Button from 'material-ui-next/Button'
import sinon from 'sinon'
import { mount } from 'enzyme'
import Page500 from '../../../src/modules/Error/components/Page500'
import MuiThemeProvider from '../../MuiThemeProvider'

describe('(Component) Page500', () => {
  let onGoHome, component

  beforeEach(() => {
    onGoHome = sinon.spy()

    component = mount(
      <MuiThemeProvider>
        <Page500 onGoHome={onGoHome} />
      </MuiThemeProvider>
    )
  })

  it('call should work when click home', () => {
    component.find(Button).at(0).simulate('click')
    expect(onGoHome).to.have.property('callCount', 1)
  })
})
