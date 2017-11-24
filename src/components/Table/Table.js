import * as R from 'ramda'
import React from 'react'
import { compose, pure, mapProps, withHandlers, defaultProps } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withStyles from 'material-ui/styles/withStyles'
import CircularProgress from 'material-ui/Progress/CircularProgress'
import { TableFooter, TableRow as TableRowMUI, TablePagination } from 'material-ui/Table'
import TableRow from './TableRow'
import TableHeader from './TableHeader'
import TableSearch from '../Table/TableSearch'
import Fade from '../../../../material-ui/material-ui/src/transitions/Fade'
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

  loader: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 400,
    alignItems: 'center',
    background: theme.table.backgroundColor,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
      '0px 4px 5px 0px rgba(0, 0, 0, 0.14),' +
      '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
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
  },

  hide: {
    height: 0,
    visibility: 'hidden'
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
  R.map(R.pipe(getById, parseInt)),
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

const Table = ({ classes, loading, dialogs, actions, renderHeader, renderBody, ...props }) => {
  const {
    page,
    count,
    selectCount,
    rowsPerPage,
    searchEnable,
    onSearch,
    onChangePage,
    onChangeRowsPerPage,
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
            <Fade in={selectCountVisible}>
              <div className={classes.selectCount}>{selectCount} selected</div>
            </Fade>
            <div className={classes.actions}>
              {actions}
            </div>
          </div>
          <div>
            {renderHeader()}
          </div>
        </div>
        <div className={classes.body}>
          <Fade
            in={loading}
            className={classNames(classes.loader, { [classes.hide]: !loading })}>
            <div>
              <CircularProgress size={75} color="accent" />
            </div>
          </Fade>
          <Fade
            in={!loading}
            className={classNames(classes.list, { [classes.hide]: loading })}>
            <div>
              {renderBody()}
            </div>
          </Fade>
        </div>
        <div className={classes.footer}>
          <Fade in={Boolean(count)}>
            <table>
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
            </table>
          </Fade>
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
  loading: PropTypes.bool.isRequired,
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
  withStyles(styles),
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

    renderBody: ({ children, route, list, detail, ...defaultProps }) => () => {
      const { onCheckItem, getById } = defaultProps
      const checkboxEnable = R.prop('checkboxEnable', defaultProps)
      const results = R.pathOr([], ['data', 'results'], list)
      const loading = R.prop('loading', list)
      const selectIds = getSelectIdsFromRoute(route)

      if (loading) {
        return null
      }

      return cloneFromChildren(TableRow, {
        list: results, detail, checkboxEnable, selectIds, getById, onCheckItem
      })(children)
    }
  }),
  mapProps(({ route, list, actions, dialogs, ...props }) => {
    const { classes, defaultRowsPerPage, renderHeader, renderBody, onChangePage, onChangeRowsPerPage, onSearch } = props
    const searchEnable = R.prop('searchEnable', props)

    const loading = R.prop('loading', list)
    const count = R.pathOr(0, ['data', 'count'], list)
    const page = parseInt(R.pathOr(0, ['location', 'query', 'page'], route))
    const rowsPerPage = parseInt(R.pathOr(defaultRowsPerPage, ['location', 'query', 'rowsPerPage'], route))
    const selectIds = getSelectIdsFromRoute(route)
    const selectCount = R.length(selectIds)

    return {
      classes,
      route,
      page,
      count,
      loading,
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
  pure
)

export default enhance(Table)
