// @flow
import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import Table from './Table'
import TableHeader from './TableHeader'
import TableCell from './TableCell'
import TableRow from './TableRow'
import TableColumn from './TableColumn'
import TableDetail from './TableDetail'

const listToTableProps = (results) => {
  const pageCount = get(results, 'count')
  const list = getOr([], 'results', results)

  return {
    pageCount,
    list,
    selected: true,
    selector: get('id')
  }
}

export { Table, TableHeader, TableCell, TableRow, TableColumn, TableDetail, listToTableProps }
