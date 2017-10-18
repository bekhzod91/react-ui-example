import * as R from 'ramda'
import React from 'react'
import { compose, pure, mapProps, withHandlers, setPropTypes, defaultProps } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withStyles from 'material-ui-next/styles/withStyles'
import { TableFooter, TableRow as TableRowMUI, TablePagination } from 'material-ui-next/Table'
import TableRow from './TableRow'
import TableHeader from './TableHeader'
import TableSearch from '../Table/TableSearch'
import { appendParamsToUrl, addItemToSelect, removeItemFromSelect } from '../../helpers/urls'
import { getFullPathFromLocation } from '../../helpers/get'

const styles = theme => ({
  root: {
    width: '100%',
    '& > div:first-child': {
      marginLeft: '10px',
      marginRight: '10px',
      position: 'relative'
    }
  },

  header: {
    paddingTop: 1,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px -1px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
    transition: '1s',
    background: theme.palette.primary['400'],
    '& svg': {
      color: `${theme.table.headerIconColor} !important`
    },
    '& > div:first-child': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '5px 12px 5px 12px'
    },
  },

  search: {
    '& input': {
      color: theme.table.headerTextColor
    }
  },

  select: {
    background: theme.palette.secondary['400'],
  },

  selectCount: {
    color: theme.table.headerTextColor
  },

  actions: {
    minHeight: 48,
    minWidth: 280,
    display: 'inline-flex',
    justifyContent: 'flex-end'
  },

  body: {
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

const getSelectIdsFromRoute = R.pipe(
  R.pathOr('', ['location', 'query', 'ids']),
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

const selectIdsIncludeListIds = R.curry((selectIds, listIds) =>
  R.equals(
    R.without(R.without(listIds, selectIds), selectIds),
    listIds
  )
)

const selectIdsIncludeAnyListIds = R.curry((selectIds, listIds) =>
  R.pipe(
    R.map((item) => !R.isNil(R.findLast(R.equals(item), selectIds))),
    R.any(R.equals(true))
  )(listIds)
)

const Table = ({ classes, dialogs, actions, renderHeader, renderBody, ...props }) => {
  const {
    page, count, selectCount, rowsPerPage, searchEnable, onSearch, onChangePage, onChangeRowsPerPage,
  } = props
  const selectCountVisible = selectCount !== 0

  const TableSearchCase = () => {
    if (!searchEnable) { return null }

    return (
      <TableSearch className={classes.search} onSubmit={onSearch} />
    )
  }

  return (
    <div className={classes.root}>
      <div>
        {dialogs}
        <div className={classNames(classes.header, { [classes.select]: selectCount })}>
          <div>
            <TableSearchCase />
            {selectCountVisible && <div className={classes.selectCount}>{selectCount} selected</div>}
            <div className={classes.actions}>
              {actions}
            </div>
          </div>
          <div>
            {renderHeader()}
          </div>
        </div>
        <div className={classes.body}>
          {renderBody()}
        </div>
        <div className={classes.footer}>
          {count && <table>
            <TableFooter>
              <TableRowMUI>
                <TablePagination
                  count={count}
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={onChangePage}
                  onChangeRowsPerPage={onChangeRowsPerPage}
                />
              </TableRowMUI>
            </TableFooter>
          </table>}
        </div>
      </div>
    </div>
  )
}

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  actions: PropTypes.node,
  renderHeader: PropTypes.func.isRequired,
  renderBody: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  searchEnable: PropTypes.bool.isRequired,
  selectCount: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

const enhance = compose(
  defaultProps({
    getById: R.path(['id']),
    defaultRowsPerPage: 10,
    checkboxEnable: true,
    searchEnable: true,
  }),
  setPropTypes({
    children: PropTypes.node.isRequired,
    searchEnable: PropTypes.bool,
    checkboxEnable: PropTypes.bool,
    filterEnable: PropTypes.bool,
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
      const fullPath = getFullPathFromLocation(location)

      return push(appendParamsToUrl({ page }, fullPath))
    },
    onChangeRowsPerPage: ({ route }) => (rowsPerPage) => {
      const { push, location } = route
      const fullPath = getFullPathFromLocation(location)

      return push(appendParamsToUrl({ rowsPerPage: rowsPerPage.target.value }, fullPath))
    },
    onCheckAll: ({ getById, route, list }) => () => {
      const { push, location } = route
      const listIds = getIdsFromList(getById, list)
      const fullPath = getFullPathFromLocation(location)

      return push(addItemToSelect(fullPath, 'ids', listIds))
    },
    onUnCheckAll: ({ getById, route, list }) => () => {
      const { push, location } = route
      const listIds = getIdsFromList(getById, list)
      const fullPath = getFullPathFromLocation(location)

      return push(removeItemFromSelect(fullPath, 'ids', listIds))
    },
    onCheckItem: ({ route }) => (isChecked, id) => {
      const { push, location } = route
      const fullPath = getFullPathFromLocation(location)

      if (isChecked) {
        return push(addItemToSelect(fullPath, 'ids', id))
      }

      return push(removeItemFromSelect(fullPath, 'ids', id))
    },
    onSearch: ({ route }) => (value) => {
      const { push, location } = route
      const fullPath = getFullPathFromLocation(location)

      return push(appendParamsToUrl({ search: value }, fullPath))
    }
  }),
  withHandlers({
    renderHeader: ({ children, route, list, ...props }) => () => {
      const { onCheckAll, onUnCheckAll, getById } = props
      const checkboxEnable = R.prop('checkboxEnable', props)
      const listIds = getIdsFromList(getById, list)
      const selectIds = getSelectIdsFromRoute(route)
      const checkboxIsChecked = selectIdsIncludeListIds(selectIds, listIds)
      const checkboxMinusChecked = !checkboxIsChecked ? selectIdsIncludeAnyListIds(selectIds, listIds) : false

      return cloneFromChildren(TableHeader, {
        route, checkboxEnable, checkboxIsChecked, checkboxMinusChecked, onCheckAll, onUnCheckAll
      })(children)
    },

    renderBody: ({ children, route, list, detail, ...props }) => () => {
      const { onCheckItem, getById } = props
      const checkboxEnable = R.prop('checkboxEnable', props)
      const results = R.pathOr([], ['data', 'results'], list)
      const selectIds = getSelectIdsFromRoute(route)

      return cloneFromChildren(TableRow, {
        list: results, detail, checkboxEnable, selectIds, getById, onCheckItem
      })(children)
    }
  }),
  mapProps(({ route, list, actions, dialogs, ...props }) => {
    const { defaultRowsPerPage, renderHeader, renderBody, onChangePage, onChangeRowsPerPage, onSearch } = props
    const searchEnable = R.prop('searchEnable', props)

    const count = R.pathOr(0, ['data', 'count'], list)
    const page = parseInt(R.pathOr(0, ['location', 'query', 'page'], route))
    const rowsPerPage = parseInt(R.pathOr(defaultRowsPerPage, ['location', 'query', 'rowsPerPage'], route))
    const selectIds = getSelectIdsFromRoute(route)
    const selectCount = R.length(selectIds)

    return {
      route,
      page,
      count,
      dialogs,
      actions,
      rowsPerPage,
      renderHeader,
      renderBody,
      selectCount,
      searchEnable,
      onSearch,
      onChangePage,
      onChangeRowsPerPage
    }
  }),
  withStyles(styles),
  pure
)

export default enhance(Table)
