import {
  pipe, curry, path, pathOr, prop, filter, map, head, sort, whereEq, not, gte, any, split, without,
  isNil, equals, findLast, length
} from 'ramda'
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
import Fade from 'material-ui/transitions/Fade'
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
    minHeight: 0,
    maxHeight: 0,
    visibility: 'hidden'
  }
})

const cloneFromChildren = curry((part, props, children) =>
  pipe(
    filter(whereEq({ type: part })),
    head,
    item => item && React.cloneElement(item, props)
  )(children)
)

const getSelectIdsFromRoute = pipe(
  pathOr('', ['location', 'query', 'ids']),
  split(','),
  map(parseInt),
  filter(pipe(isNaN, not)),
  sort(gte)
)

const getIdsFromList = curry((getById, list) => pipe(
  pathOr([], ['data', 'results']),
  map(pipe(getById, parseInt)),
  sort(gte)
)(list))

const selectIdsIncludeListIds = curry((selectIds, listIds) =>
  equals(
    without(without(listIds, selectIds), selectIds),
    listIds
  )
)

const selectIdsIncludeAnyListIds = curry((selectIds, listIds) =>
  pipe(
    map((item) => !isNil(findLast(equals(item), selectIds))),
    any(equals(true))
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
    getById: path(['id']),
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
      const checkboxEnable = prop('checkboxEnable', props)
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
      const checkboxEnable = prop('checkboxEnable', defaultProps)
      const results = pathOr([], ['data', 'results'], list)
      const loading = prop('loading', list)
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
    const searchEnable = prop('searchEnable', props)

    const loading = prop('loading', list)
    const count = pathOr(0, ['data', 'count'], list)
    const page = parseInt(pathOr(0, ['location', 'query', 'page'], route))
    const rowsPerPage = parseInt(pathOr(defaultRowsPerPage, ['location', 'query', 'rowsPerPage'], route))
    const selectIds = getSelectIdsFromRoute(route)
    const selectCount = length(selectIds)

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
