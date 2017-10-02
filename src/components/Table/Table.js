import R from 'ramda'
import React from 'react'
import { compose, mapProps, withHandlers, setPropTypes, defaultProps } from 'recompose'
import PropTypes from 'prop-types'
import withStyles from 'material-ui-next/styles/withStyles'
import { TableFooter, TablePagination } from 'material-ui-next/Table'
import TableRow from './TableRow'
import TableHeader from './TableHeader'
import TableSearch from '../Table/TableSearch'
import { appendParamsToUrl, addItemToSelect, removeItemFromSelect } from '../../helpers/urls'

const styles = theme => ({
  root: {
    width: '100%'
  },
  wall: {
    marginLeft: '10px',
    marginRight: '10px'
  },

  header: {
    paddingTop: 1,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px -1px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
    background: theme.palette.primary['400']
  },

  action: {
    display: 'flex',
    margin: '5px 0 5px 5px'
  },

  tableBody: {
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: theme.table.backgroundColor,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px 4px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
    '& td': {
      border: 'none !important'
    }
  }
})

const cloneFromChildren = R.curry((part, props, children) =>
  R.pipe(
    R.filter(R.whereEq({ type: part })),
    R.head,
    item => item && React.cloneElement(item, props)
  )(children)
)
const getSelectIdsFromQuery = R.pipe(
  R.split(','),
  R.map(parseInt),
  R.filter(R.pipe(isNaN, R.not)),
  R.sort(R.gte)
)

const getIdsFromList = R.curry((getById, list) => R.pipe(
  R.pathOr([], ['data', 'results']),
  R.map(
    R.pipe(getById, parseInt)
  ),
  R.sort(R.gte)
)(list))

const selectIdsIncludeListIds = R.curry((selectIds, listIds) => R.equals(
  R.without(R.without(listIds, selectIds), selectIds),
  listIds
))

const Table = ({ classes, tableHeader, tableRows, ...props }) => {
  const { page, count, rowsPerPage, onSearch, onChangePage, onChangeRowsPerPage } = props

  return (
    <div className={classes.root}>
      <div className={classes.wall}>
        <div className={classes.header}>
          <div className={classes.action}>
            <TableSearch onSubmit={onSearch} />
          </div>
          <div>
            {tableHeader}
          </div>
        </div>
        <div className={classes.tableBody}>
          {tableRows}
        </div>
        <div className={classes.footer}>
          {count && <table>
            <TableFooter>
              <TablePagination
                count={count}
                rowsPerPageOptions={[10, 25, 50, 100]}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
              />
            </TableFooter>
          </table>}
        </div>
      </div>
    </div>
  )
}

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeader: PropTypes.node.isRequired,
  tableRows: PropTypes.node.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

const enhance = compose(
  defaultProps({
    getById: R.path(['id']),
    defaultRowsPerPage: 10,
    checkboxEnable: true
  }),
  setPropTypes({
    children: PropTypes.any.isRequired,
    list: PropTypes.object.isRequired,
    detail: PropTypes.shape({
      id: PropTypes.number,
      node: PropTypes.node,
    }),
    route: PropTypes.shape({
      companyId: PropTypes.number.isRequired,
      location: PropTypes.object.isRequired,
      push: PropTypes.func.isRequired
    }).isRequired
  }),
  withHandlers({
    onChangePage: ({ route }) => (event, page) => {
      const { push, location } = route
      const pathname = R.prop('pathname', location)
      const search = R.prop('search', location)
      const fullPath = `${pathname}${search}`

      return push(appendParamsToUrl({ page }, fullPath))
    },
    onChangeRowsPerPage: ({ route }) => (rowsPerPage) => {
      const { push, location } = route
      const pathname = R.prop('pathname', location)
      const search = R.prop('search', location)
      const fullPath = `${pathname}${search}`

      return push(appendParamsToUrl({ rowsPerPage: rowsPerPage.target.value }, fullPath))
    },
    onCheckAll: ({ getById, route, list }) => (isChecked) => {
      const { push, location } = route
      const listIds = getIdsFromList(getById, list)
      const pathname = R.prop('pathname', location)
      const search = R.prop('search', location)
      const fullPath = `${pathname}${search}`

      if (isChecked) {
        return push(addItemToSelect(fullPath, 'ids', listIds))
      }

      return push(removeItemFromSelect(fullPath, 'ids', listIds))
    },
    onCheckItem: ({ route }) => (isChecked, id) => {
      const { push, location } = route
      const pathname = R.prop('pathname', location)
      const search = R.prop('search', location)
      const fullPath = `${pathname}${search}`

      if (isChecked) {
        return push(addItemToSelect(fullPath, 'ids', id))
      }

      return push(removeItemFromSelect(fullPath, 'ids', id))
    },
    onSearch: ({ route }) => (value) => {
      const { push, location } = route
      const pathname = R.prop('pathname', location)
      const search = R.prop('search', location)
      const fullPath = `${pathname}${search}`

      return push(appendParamsToUrl({ search: value }, fullPath))
    },
  }),
  mapProps(({ children, route, detail, list, ...props }) => {
    const { defaultRowsPerPage, getById, onCheckAll, onCheckItem, onChangePage, onChangeRowsPerPage, onSearch } = props
    const results = R.pathOr([], ['data', 'results'], list)
    const count = R.pathOr(0, ['data', 'count'], list)
    const page = parseInt(R.pathOr(0, ['location', 'query', 'page'], route))
    const rowsPerPage = parseInt(R.pathOr(defaultRowsPerPage, ['location', 'query', 'rowsPerPage'], route))
    const ids = R.pathOr('', ['location', 'query', 'ids'], route)

    const listIds = getIdsFromList(getById, list)
    const selectIds = getSelectIdsFromQuery(ids)
    const checkboxEnable = R.prop('checkboxEnable', props)
    const checkboxIsChecked = selectIdsIncludeListIds(selectIds, listIds)

    const tableHeader = cloneFromChildren(TableHeader, {
      route, checkboxEnable, checkboxIsChecked, onCheckAll
    })(children)
    const tableRows = cloneFromChildren(TableRow, {
      list: results, detail, checkboxEnable, selectIds, getById, onCheckItem
    })(children)

    return {
      page,
      count,
      rowsPerPage,
      tableHeader,
      tableRows,
      onSearch,
      onChangePage,
      onChangeRowsPerPage
    }
  }),
  withStyles(styles)
)

export default enhance(Table)
