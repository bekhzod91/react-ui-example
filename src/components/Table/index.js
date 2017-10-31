import * as R from 'ramda'
import Table from './Table'
import TableHeader from './TableHeader'
import TableCell from './TableCell'
import TableRow from './TableRow'
import TableColumn from './TableColumn'
import TableDetail from './TableDetail'

const listToTableProps = (results) => {
  const pageCount = R.prop('count', results)
  const list = R.pathOr([], 'results', results)

  return {
    pageCount,
    list,
    selected: true,
    selector: R.prop('id')
  }
}

export { Table, TableHeader, TableCell, TableRow, TableColumn, TableDetail, listToTableProps }
