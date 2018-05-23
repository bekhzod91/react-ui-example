import React from 'react'
import sinon from 'sinon'
import { compose, map, prop, range, slice, length, pathOr } from 'ramda'
import { mount } from 'enzyme'
import CircularProgress from '@material-ui/core/CircularProgress'
import ButtonBase from '@material-ui/core/ButtonBase'
import createHistory from 'history/createBrowserHistory'
import TablePagination from '../../../src/components/Table/TablePagination'
import { nextOrderingParams, sortingStatus } from '../../../src/components/Table/TableCell'
import WrapperProvider from '../../WrapperProvider'
import { Table, TableCell, TableRow, TableHeader, TableBody, TableSearch } from '../../../src/components/Table'

const Action = () => <div>Action</div>
const Dialog = () => <div>Dialog</div>
const Detail = () => <div>Detail</div>
const getListByPage = (rowsPerPage, page, list) => slice((page - 1) * rowsPerPage, page * rowsPerPage, list)
const ROWS_PER_PAGE = 10
const PAGE = 1
const LIST = map((item) => ({
  id: item,
  name: `User${item}`,
  email: `admin${item}@example.com`,
  status: item % 2 === 0 ? 'ACTIVE' : 'INACTIVE',
  createDate: new Date()
}), range(1, 40))

const DEFAULT_PROPS = {
  list: { loading: false, data: { count: length(LIST), results: getListByPage(ROWS_PER_PAGE, PAGE, LIST) } },
  detail: { id: 1, detail: <Detail /> },
  actions: (<Action />),
  dialogs: (<Dialog />),
}

describe('(Component) Table', () => {
  const getComponentFromProps = (props, history) => {
    const results = pathOr([], ['list', 'data', 'results'], props)
    return mount(
      <WrapperProvider history={history}>
        <Table {...props}>
          <TableHeader>
            <TableRow>
              <TableCell sortKey="id">ID</TableCell>
              <TableCell columnSize={3}>Title</TableCell>
              <TableCell columnSize={3}>Owner</TableCell>
              <TableCell columnSize={2}>Status</TableCell>
              <TableCell columnSize={3}>Create date</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell >{prop('id', item)}</TableCell>
                <TableCell columnSize={3} >{prop('name', item)}</TableCell>
                <TableCell columnSize={3} >{prop('email', item)}</TableCell>
                <TableCell columnSize={2} >{prop('status', item)}</TableCell>
                <TableCell columnSize={3} >{compose(String, prop('createDate'))(item)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </WrapperProvider>
    )
  }

  it('render Header', () => {
    const component = getComponentFromProps(DEFAULT_PROPS)
    expect(component.find(TableHeader).find(TableCell)).to.have.lengthOf(5)
  })

  it('render Body', () => {
    const component = getComponentFromProps(DEFAULT_PROPS)
    expect(component.find(TableBody).find(TableCell)).to.have.lengthOf(10 * 5)
  })

  it('render Loading', () => {
    const defaultList = prop('list', DEFAULT_PROPS)
    const list = { ...defaultList, loading: true }
    const component = getComponentFromProps({ ...DEFAULT_PROPS, list })
    expect(component.find(CircularProgress)).to.have.lengthOf(1)
  })

  it('render Action', () => {
    const component = getComponentFromProps(DEFAULT_PROPS)
    expect(component.find(Action)).to.have.lengthOf(1)
  })

  it('render Dialog', () => {
    const component = getComponentFromProps(DEFAULT_PROPS)
    expect(component.find(Dialog)).to.have.lengthOf(1)
  })

  // it('render Detail', () => {
  //   const component = getComponentFromProps(DEFAULT_PROPS)
  //   expect(component.find(Detail)).to.have.lengthOf(1)
  // })

  it('don\'t render Detail if id not have', () => {
    const defaultDetail = prop('detail', DEFAULT_PROPS)
    const detail = { ...defaultDetail, id: null }
    const component = getComponentFromProps({ ...DEFAULT_PROPS, detail })
    expect(component.find(Detail)).to.have.lengthOf(0)
  })

  it('search value get from URL', () => {
    const history = createHistory()
    history.push('?search=hello')
    const component = getComponentFromProps(DEFAULT_PROPS, history)
    expect(component.find(TableSearch).find('input').props().value).to.equals('hello')
  })

  it('search change value', done => {
    const history = createHistory()
    history.push('?page=1')
    sinon.spy(history, 'push')

    const component = getComponentFromProps(DEFAULT_PROPS, history)

    component.find(TableSearch).find('input').simulate('change', { target: { value: 'myname' } })
    component.find(TableSearch).find('input').simulate('keypress', { key: 'Enter' })

    setTimeout(() => {
      expect(history.push.calledOnce).to.equal(true)
      expect(history.push.getCall(0).args[0]).to.equal('?page=1&search=myname')

      done()
    })
  })

  it('select count correct', () => {
    const history = createHistory()
    history.push('?select=1,2,3,4,5')
    const component = getComponentFromProps(DEFAULT_PROPS)
    const selectCount = component.find('[data-test="table-select-count"]').props().children[0]

    expect(selectCount).to.equals(5)
  })

  it('click to sortable column', done => {
    const history = createHistory()
    history.push('?page=1')
    sinon.spy(history, 'push')

    const component = getComponentFromProps(DEFAULT_PROPS, history)
    component.find(TableCell).first().find('a').first().simulate('click')

    setTimeout(() => {
      expect(history.push.calledOnce).to.be.equal(true)
      done()
    })
  })

  it('not render link to none sortable column', () => {
    const spy = sinon.spy()
    const defaultRoute = prop('route', DEFAULT_PROPS)
    const component = getComponentFromProps({ ...DEFAULT_PROPS, route: { ...defaultRoute, push: spy } })

    expect(component.find(TableCell).at(1).find('a')).to.have.lengthOf(0)
  })

  it('click pagination prev', done => {
    const history = createHistory()
    history.location.search = '?page=3'
    sinon.spy(history, 'push')

    expect(history.push.calledOnce).to.equal(false)

    const component = getComponentFromProps(DEFAULT_PROPS, history)
    component.find(TablePagination).find(ButtonBase).at(0).simulate('click')

    setTimeout(() => {
      expect(history.push.calledOnce).to.equal(true)
      done()
    })
  })

  it('click pagination next', done => {
    const history = createHistory()
    sinon.spy(history, 'push')

    expect(history.push.calledOnce).to.equal(false)

    const component = getComponentFromProps(DEFAULT_PROPS, history)
    component.find(TablePagination).find(ButtonBase).at(1).simulate('click')

    setTimeout(() => {
      expect(history.push.calledOnce).to.equal(true)
      done()
    })
  })

  it('nextOrderingParams add or change params for sorting', () => {
    expect(nextOrderingParams('?page=3', 'sort', 'id')).to.eql({ sort: 'id' })
    expect(nextOrderingParams('?page=3&sort=id', 'sort', 'id')).to.eql({ sort: '-id' })
    expect(nextOrderingParams('?page=3&sort=-id', 'sort', 'id')).to.eql({ sort: '' })

    expect(nextOrderingParams('?page=3', 'sortBy', 'id')).to.eql({ sortBy: 'id' })
    expect(nextOrderingParams('?page=3&sortBy=id', 'sortBy', 'id')).to.eql({ sortBy: '-id' })
    expect(nextOrderingParams('?page=3&sortBy=-id', 'sortBy', 'id')).to.eql({ sortBy: '' })

    expect(nextOrderingParams('?page=3&sort=id', 'sort', 'createDate'))
      .to.eql({ sort: 'createDate,id' })
    expect(nextOrderingParams('?page=3&sort=id,createDate', 'sort', 'createDate'))
      .to.eql({ sort: '-createDate,id' })
    expect(nextOrderingParams('?page=3&sort=id,-createDate', 'sort', 'createDate')).to.eql({ sort: 'id' })

    expect(nextOrderingParams('?page=3&sort=createDate,id', 'sort', 'id')).to.eql({ sort: '-id,createDate' })
  })

  it('sortingStatus get ordering status from sorting', () => {
    expect(sortingStatus('/c/0/company/1/?page=3', 'sort', 'id')).to.equal('not')
    expect(sortingStatus('/c/0/company/1/?page=3&sort=id', 'sort', 'id')).to.equal('asc')
    expect(sortingStatus('/c/0/company/1/?page=3&sort=-id', 'sort', 'id')).to.equal('desc')

    expect(sortingStatus('/c/0/company/1/?page=3', 'sortBy', 'id')).to.equal('not')
    expect(sortingStatus('/c/0/company/1/?page=3&sortBy=id', 'sortBy', 'id')).to.equal('asc')
    expect(sortingStatus('/c/0/company/1/?page=3&sortBy=-id', 'sortBy', 'id')).to.equal('desc')

    expect(sortingStatus('/c/0/company/1/?page=3&sort=id', 'sort', 'createDate')).to.equal('not')
    expect(sortingStatus('/c/0/company/1/?page=3&sort=id,createDate', 'sort', 'createDate')).to.equal('asc')
    expect(sortingStatus('/c/0/company/1/?page=3&sort=id,-createDate', 'sort', 'createDate')).to.equal('desc')
  })
})
