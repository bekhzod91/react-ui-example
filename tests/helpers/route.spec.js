import sinon from 'sinon'
import createHistory from 'history/createBrowserHistory'
import { redirect, addParamsRoute } from '../../src/helpers/route'

describe('route', () => {
  /**
   * Testing for redirect function
   */
  describe('redirect', () => {
    let history

    beforeEach(() => {
      history = createHistory()
      history.push('/')
    })

    it('should change pathname', () => {
      const pathname = '/home'

      sinon.spy(history, 'push')
      redirect({ pathname }, history)

      expect(history.push.calledOnce).to.equal(true)
      expect(history.push.getCall(0).args[0]).to.equal(`${pathname}?`)
    })

    it('should change params', () => {
      const params = { page: 1 }

      sinon.spy(history, 'push')
      redirect({ params }, history)

      expect(history.push.calledOnce).to.equal(true)
      expect(history.push.getCall(0).args[0]).to.equal('/?page=1')
    })

    it('should change pathname and params', () => {
      const pathname = '/home'
      const params = { page: 1 }

      sinon.spy(history, 'push')
      redirect({ pathname, params }, history)

      expect(history.push.calledOnce).to.equal(true)
      expect(history.push.getCall(0).args[0]).to.equal(`${pathname}?page=1`)
    })
  })

  /**
   * Testing for addParamsRoute function
   */
  describe('addParamsRoute', () => {
    let history

    beforeEach(() => {
      history = createHistory()
      history.push('/')
    })

    it('should add params to empty search', () => {
      sinon.spy(history, 'push')
      addParamsRoute({ page: 1 }, history)

      expect(history.push.calledOnce).to.equal(true)
      expect(history.push.getCall(0).args[0]).to.equal(`?page=1`)
    })

    it('should add params with exits search', () => {
      history.location.search = '?search=see'

      sinon.spy(history, 'push')
      addParamsRoute({ page: 1 }, history)

      expect(history.push.calledOnce).to.equal(true)
      expect(history.push.getCall(0).args[0]).to.equal('?search=see&page=1')
    })
  })
})
