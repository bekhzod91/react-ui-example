import { T, compose, prop, path } from 'ramda'
import sinon from 'sinon'
import React from 'react'
import { mount } from 'enzyme'
import { withRouter } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { parseParams } from '../../src/helpers/urls'
import { mapStrToBoolean } from '../../src/helpers/mapper'
import ModalWrapper from '../../src/wrappers/ModalWrapper'
import WrapperProvider from '../WrapperProvider'

const getModalState = compose(
  mapStrToBoolean,
  prop('modal'),
  parseParams,
  path(['location', 'search'])
)

describe('(Component) ModalWrapper', () => {
  let history, component, enhance

  const before = (key = 'modal', handlerOnSubmit = T) => {
    history = createHistory()

    enhance = compose(
      withRouter,
      ModalWrapper({ key, handlerOnSubmit })
    )
    const ModalComponent = enhance(props => {
      return (
        <div>
          <button id="open" onClick={props.modal.onOpenModal}>Open</button>
          <button id="close" onClick={props.modal.onCloseModal}>Close</button>
          <button id="submit" onClick={props.modal.onSubmitModal}>Submit</button>
        </div>
      )
    })

    component = mount(
      <WrapperProvider history={history}>
        <ModalComponent />
      </WrapperProvider>
    )
  }

  it('open true', done => {
    before()
    history.push('?modal=true')

    setImmediate(() => {
      const isOpen = getModalState(history)
      expect(isOpen).to.be.eq(true)

      done()
    })
  })

  it('open false', () => {
    before()

    const isOpen = getModalState(history)
    expect(isOpen).to.be.eq(true)
  })

  it('onOpen', done => {
    before()
    component.find('#open').first().simulate('click')

    setImmediate(() => {
      const isOpen = getModalState(history)
      expect(isOpen).to.be.eq(true)

      done()
    })
  })

  it('onClose', done => {
    before()
    component.find('#open').first().simulate('click')

    setImmediate(() => {
      const isOpen = getModalState(history)
      expect(isOpen).to.be.eq(true)

      done()
    })
  })

  it('onSubmit', done => {
    const handleOnSubmit = sinon.spy()
    before('modal', handleOnSubmit)

    component.find('#submit').first().simulate('click')

    setImmediate(() => {
      expect(handleOnSubmit.calledOnce).to.be.eq(true)

      done()
    })
  })
})
