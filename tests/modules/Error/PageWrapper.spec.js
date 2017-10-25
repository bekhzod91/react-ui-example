import React from 'react'
import Button from 'material-ui-next/Button'
import sinon from 'sinon'
import { mount } from 'enzyme'
import PageWrapper from '../../../src/modules/Error/components/PageWrapper'
import MuiThemeProvider from '../../MuiThemeProvider'

describe('(Component) PageWrapper', () => {
  let onGoHome, component, Children

  beforeEach(() => {
    onGoHome = sinon.spy()
    Children = (appBar) => <div>Hello</div>

    component = mount(
      <MuiThemeProvider>
        <PageWrapper title="403" onGoHome={onGoHome}>
          <Children />
        </PageWrapper>
      </MuiThemeProvider>
    )
  })

  it('title', () => {
    expect(component.find('h1').at(0).text()).to.equal('403')
  })

  it('renders its children inside of the viewport', () => {
    expect(component.find(Children)).to.have.lengthOf(1)
  })

  it('call should work when click home', () => {
    component.find(Button).at(0).simulate('click')
    expect(onGoHome).to.have.property('callCount', 1)
  })
})
