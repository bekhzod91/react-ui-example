import React from 'react'
import { mount } from 'enzyme'
import BaseLayout from '../../src/components/Layouts/BaseLayout'
import WrapperProvider from '../WrapperProvider'

describe('(Layout) PageLayout', () => {
  it('renders as a <div>', () => {
    const Child = () => <div>Hello</div>
    const component = mount(
      <WrapperProvider>
        <BaseLayout>
          <Child />
        </BaseLayout>
      </WrapperProvider>
    )
    expect(component).to.have.lengthOf(1)
  })

  it('renders its children inside of the viewport', () => {
    const Child = () => <h2>child</h2>
    const component = mount(
      <WrapperProvider>
        <BaseLayout>
          <Child />
        </BaseLayout>
      </WrapperProvider>
    )

    expect(component.find(Child)).to.have.lengthOf(1)
  })
})
