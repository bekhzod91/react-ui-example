import { pathOr, prop } from 'ramda'
import Table from './Table'
import TableHeader from './TableHeader'
import TableCell from './TableCell'
import TableRow from './TableRow'
import TableColumn from './TableColumn'
import TableDetail from './TableDetail'

const listToTableProps = (results) => {
  const pageCount = prop('count', results)
  const list = pathOr([], 'results', results)

  return {
    pageCount,
    list,
    selected: true,
    selector: prop('id')
  }
}

export { Table, TableHeader, TableCell, TableRow, TableColumn, TableDetail, listToTableProps }
