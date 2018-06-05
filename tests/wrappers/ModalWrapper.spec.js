import { T } from 'ramda'
import sinon from 'sinon'
import React from 'react'
import { mount } from 'enzyme'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { parseParams } from '../../src/helpers/urls'
import { mapStrToBoolean } from '../../src/helpers/mapper'
import ModalWrapper from '../../src/wrappers/ModalWrapper'
import WrapperProvider from '../WrapperProvider'

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

  it('onOpen', done => {
    before()
    component.find('#open').first().simulate('click')

    setImmediate(() => {
      const params = parseParams(history.location.search)
      const modalIsOpen = mapStrToBoolean(params.modal)
      expect(modalIsOpen).to.have.eq(true)
      done()
    })
  })

  it('onClose', done => {
    before()
    component.find('#open').first().simulate('click')

    setImmediate(() => {
      const params = parseParams(history.location.search)
      const modalIsOpen = mapStrToBoolean(params.modal)
      expect(modalIsOpen).to.have.eq(true)
      done()
    })
  })

  it('onSubmit', done => {
    const handleOnSubmit = sinon.spy()
    before('modal', handleOnSubmit)

    component.find('#submit').first().simulate('click')

    setImmediate(() => {
      expect(handleOnSubmit.calledOnce).to.have.eq(true)
      done()
    })
  })
})
