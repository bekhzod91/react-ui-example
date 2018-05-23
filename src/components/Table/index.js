import { pathOr, prop } from 'ramda'
import Table from './Table'
import TableHeader from './TableHeader'
import TableCell from './TableCell'
import TableRow from './TableRow'
import TableDetail from './TableDetail'
import TableSearch from './TableSearch'
import TableBody from './TableBody'

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

export { Table, TableHeader, TableCell, TableRow, TableDetail, TableSearch, TableBody, listToTableProps }
