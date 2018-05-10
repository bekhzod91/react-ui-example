import React from 'react'
import Button from 'material-ui/Button'
import sinon from 'sinon'
import { mount } from 'enzyme'
import PageWrapper from '../../../src/modules/Error/components/PageWrapper'
import WrapperProvider from '../../WrapperProvider'

describe('(Component) PageWrapper', () => {
  let onGoHome, component, Children

  beforeEach(() => {
    onGoHome = sinon.spy()
    Children = (appBar) => <div>Hello</div>

    component = mount(
      <WrapperProvider>
        <PageWrapper title="403" onGoHome={onGoHome}>
          <Children />
        </PageWrapper>
      </WrapperProvider>
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
