import React from 'react'
import sinon from 'sinon'
import { compose, map, always, prop, range, slice, length } from 'ramda'
import { mount } from 'enzyme'
import CircularProgress from 'material-ui/Progress/CircularProgress'
import { TablePagination } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import { Table, TableCell, TableRow, TableHeader, TableColumn, TableSearch } from '../../../src/components/Table'
import WrapperProvider from '../../WrapperProvider'
import createStore from '../../../src/store/createStore'

describe('(Component) Table', () => {
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
    route: {
      location: {
        pathname: '',
        search: '?',
        query: { search: 'hello', select: '1,2,3,4,5' }
      },
      push: always(true),
      companyId: 0
    },
    list: { loading: false, data: { count: length(LIST), results: getListByPage(ROWS_PER_PAGE, PAGE, LIST) } },
    detail: { id: 1, detail: <Detail /> },
    actions: (<Action />),
    dialogs: (<Dialog />),
  }
  const getComponentFromProps = (props) => {
    const store = createStore({})

    return mount(
      <WrapperProvider store={store}>
        <Table {...props}>
          <TableHeader>
            <TableCell sort="id">ID</TableCell>
            <TableCell columnSize={3}>Title</TableCell>
            <TableCell columnSize={3}>Owner</TableCell>
            <TableCell columnSize={2}>Status</TableCell>
            <TableCell columnSize={3}>Create date</TableCell>
          </TableHeader>
          <TableRow>
            <TableColumn content={prop('id')} />
            <TableColumn content={prop('name')} columnSize={3} />
            <TableColumn content={prop('email')} columnSize={3} />
            <TableColumn content={prop('status')} columnSize={2} />
            <TableColumn content={compose(String, prop('createDate'))} columnSize={3} />
          </TableRow>
        </Table>
      </WrapperProvider>
    )
  }

  it('render Content', () => {
    const component = getComponentFromProps(DEFAULT_PROPS)
    expect(component.find(TableColumn)).to.have.lengthOf(10 * 5)
  })

  it('render Header', () => {
    const component = getComponentFromProps(DEFAULT_PROPS)
    expect(component.find(TableCell)).to.have.lengthOf(5)
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

  it('render Detail', () => {
    const component = getComponentFromProps(DEFAULT_PROPS)
    expect(component.find(Detail)).to.have.lengthOf(1)
  })

  it('don\'t render Detail if id not have', () => {
    const defaultDetail = prop('detail', DEFAULT_PROPS)
    const detail = { ...defaultDetail, id: null }
    const component = getComponentFromProps({ ...DEFAULT_PROPS, detail })
    expect(component.find(Detail)).to.have.lengthOf(0)
  })

  it('search value get from URL', () => {
    const component = getComponentFromProps(DEFAULT_PROPS)
    expect(component.find(TableSearch).find('input').props().value).to.equals('hello')
  })

  it('search change value', () => {
    const spy = sinon.spy((value) => value)
    const defaultRoute = prop('route', DEFAULT_PROPS)
    const component = getComponentFromProps({ ...DEFAULT_PROPS, route: { ...defaultRoute, push: spy } })

    component.find(TableSearch).find('input').simulate('change', { target: { value: 'myname' } })
    component.find(TableSearch).find('input').simulate('keypress', { key: 'Enter' })

    expect(spy).to.have.property('callCount', 1)
    expect(spy.getCall(0).returnValue).to.equal('?page=1&search=myname')
  })

  it('select count correct', () => {
    const component = getComponentFromProps(DEFAULT_PROPS)
    const selectCount = component.find('[data-test="table-select-count"]').props().children[0]
    expect(selectCount).to.equals(5)
  })

  it('click to sortable column', () => {
    const spy = sinon.spy()
    const defaultRoute = prop('route', DEFAULT_PROPS)
    const component = getComponentFromProps({ ...DEFAULT_PROPS, route: { ...defaultRoute, push: spy } })

    component.find(TableCell).at(0).find('a').first().simulate('click')
    expect(spy).to.have.property('callCount', 1)
  })

  it('not render link to none sortable column', () => {
    const spy = sinon.spy()
    const defaultRoute = prop('route', DEFAULT_PROPS)
    const component = getComponentFromProps({ ...DEFAULT_PROPS, route: { ...defaultRoute, push: spy } })

    expect(component.find(TableCell).at(1).find('a')).to.have.lengthOf(0)
  })

  it('click pagination prev', () => {
    const spy = sinon.spy((page) => page)
    const defaultRoute = prop('route', DEFAULT_PROPS)
    const route = {
      ...defaultRoute,
      location: {
        query: { page: 3 },
        search: '?',
        pathname: ''
      },
      push: spy
    }
    const component = getComponentFromProps({ ...DEFAULT_PROPS, route })

    component.find(TablePagination).find(IconButton).at(0).simulate('click')
    expect(spy).to.have.property('callCount', 1)
    expect(spy.getCall(0).returnValue).to.equal('?page=2')
  })

  it('click pagination next', () => {
    const spy = sinon.spy((page) => page)
    const defaultRoute = prop('route', DEFAULT_PROPS)
    const component = getComponentFromProps({ ...DEFAULT_PROPS, route: { ...defaultRoute, push: spy } })

    component.find(TablePagination).find(IconButton).at(1).simulate('click')
    expect(spy).to.have.property('callCount', 1)
    // page 2 correct because page start with zero
    expect(spy.getCall(0).returnValue).to.equal('?page=2')
  })
})
