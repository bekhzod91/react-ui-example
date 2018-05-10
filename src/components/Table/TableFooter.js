import React from 'react'
import { TableFooter as TableFooterMUI, TableRow, TablePagination } from 'material-ui/Table'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import { appendParamsToUrl } from '../../helpers/urls'
import { getPageFromRoute, getRowsPerPageFromRouteOr } from './helper'
import { getFullPathFromLocation } from '../../helpers/get'

const TableFooter = ({ count, onChangePage, defaultRowsPerPage, onChangeRowsPerPage, route }) => {
  const page = getPageFromRoute(route)
  const rowsPerPage = getRowsPerPageFromRouteOr(defaultRowsPerPage, route)

  if (!count) {
    return null
  }

  return (
    <table>
      <TableFooterMUI>
        <TableRow>
          <TablePagination
            count={count}
            page={page - 1}
            onChangePage={onChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        </TableRow>
      </TableFooterMUI>
    </table>
  )
}

TableFooter.propTypes = {
  route: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  defaultRowsPerPage: PropTypes.number.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

export default compose(
  withHandlers({
    onChangePage: ({ route }) => (event, page) => {
      const { push, location } = route
      // Material ui page start with zero this trick for page start with 1
      const nextPage = page + 1
      const fullPath = getFullPathFromLocation(location)

      return push(appendParamsToUrl({ page: nextPage }, fullPath))
    },
    onChangeRowsPerPage: ({ route }) => (rowsPerPage) => {
      const { push, location } = route
      const fullPath = getFullPathFromLocation(location)

      return push(appendParamsToUrl({ rowsPerPage: rowsPerPage.target.value, page: 1 }, fullPath))
    }
  })
)(TableFooter)
