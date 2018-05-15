import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import MUITablePagination from '@material-ui/core/TablePagination'
import { componentFromStream, createEventHandler } from 'recompose'
import { redirect } from '../../helpers/route'
import { getPage, getRowsPerPage } from './helper'

const TablePagination = componentFromStream(props$ => {
  const { stream: onChangePage$, handler: onChangePage } = createEventHandler()
  const { stream: onChangeRowsPerPage$, handler: onChangeRowsPerPage } = createEventHandler()

  onChangePage$
    .withLatestFrom(props$)
    .subscribe(([page, { history }]) => {
      const params = { page: page + 1 }
      redirect({ params }, history)
    })

  onChangeRowsPerPage$
    .withLatestFrom(props$)
    .subscribe(([rowsPerPage, { history }]) => {
      const params = { rowsPerPage: rowsPerPage.target.value, page: 1 }
      redirect({ params }, history)
    })

  return props$.combineLatest(props => {
    const { count, history, defaultRowsPerPage } = props

    return (
      <MUITablePagination
        component="div"
        count={count}
        page={getPage(history) - 1}
        onChangePage={(event, page) => onChangePage(page)}
        rowsPerPage={getRowsPerPage(defaultRowsPerPage, history)}
        rowsPerPageOptions={[10, 25, 50, 100]}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    )
  })
})

TablePagination.propTypes = {
  count: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  defaultRowsPerPage: PropTypes.number.isRequired,
}

export default withRouter(TablePagination)
