import R from 'ramda'
import React from 'react'
import moment from 'moment'
import sinon from 'sinon'
import { mount } from 'enzyme'
import MuiThemeProvider from '../../MuiThemeProvider'
import { Table, TableHeader, TableRow, TableCell, TableColumn } from '../../../src/components/Table'

const getFakeList = R.curry((item) => ({
  count: R.length(item),
  results: R.map((item) => ({
    id: item,
    name: `name - ${item}`,
    createDate: moment.now(),
    status: false
  }))(item)
}))

const getFakeRoute = (params) => ({ location: { query: params } })

describe('(Component) Table', () => {
  let table, list, route, detail

  beforeEach(() => {
    table = (
      <Table route={route} detail={detail} list={list}>
        <TableHeader>
          <TableCell columnSize={3} sort="id">ID</TableCell>
          <TableCell columnSize={3} sort="name">Title</TableCell>
          <TableCell columnSize={3} sort="owner">Owner</TableCell>
          <TableCell columnSize={3} sort="status">Status</TableCell>
        </TableHeader>
        <TableRow>
          <TableColumn columnSize={3} content={R.prop('id')} />
          <TableColumn columnSize={3} content={R.prop('name')} />
          <TableColumn columnSize={3} content={(item) => <div>{R.prop('createDate', item)}</div>} />
          <TableColumn columnSize={3} content={R.prop('status')} />
        </TableRow>
      </Table>
    )
  })

  // it('render ', () => {
  //   const list = getFakeList(R.range(1, 100))
  //   const route = getFakeRoute({ ids: R.join(',', list) })
  //   const detail = null
  //   const component = mount(
  //     <MuiThemeProvider>
  //       {React.cloneElement(table, { list, route, detail })}
  //     </MuiThemeProvider>
  //   )
  // })
})
