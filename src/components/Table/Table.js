import { compose, path, pathOr, prop, length } from 'ramda'
import React from 'react'
import { pure, mapProps, withHandlers, defaultProps } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withStyles from 'material-ui/styles/withStyles'
import CircularProgress from 'material-ui/Progress/CircularProgress'
import Fade from 'material-ui/transitions/Fade'
import TableSearch from '../Table/TableSearch'
import TableFooter from '../../components/Table/TableFooter'
import { addItemToSelect, removeItemFromSelect } from '../../helpers/urls'
import { getFullPathFromLocation } from '../../helpers/get'
import Render from '../../components/Transitions/Render'
import {
  getIdsFromList,
  getSelectIdsFromRoute,
  renderTableBodyFromProps,
  renderTableHeaderFromProps
} from './helper'
import NotFoundImage from './searchIcon.svg'

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

  noData: {
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
      '0px 4px 5px 0px rgba(0, 0, 0, 0.14), ' +
      '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
    background: '#fff',
    height: 400,
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    '& img': {
      width: '25%',
      margin: '0 60px'
    },
    '& h4': {
      margin: '0 0 10px',
      fontSize: '1.5em',
      textAlign: 'center'
    }
  },

  hide: {
    minHeight: 0,
    maxHeight: 0,
    height: 0,
    visibility: 'hidden'
  }
})

const enhance = compose(
  withStyles(styles),
  defaultProps({
    getById: path(['id']),
    defaultRowsPerPage: 10,
    checkboxEnable: true,
    searchEnable: true,
  }),
  withHandlers({
    onCheckAll: ({ getById, route, list }) => () => {
      const { push, location } = route
      const listIds = getIdsFromList(getById, list)
      const fullPath = getFullPathFromLocation(location)

      return push(addItemToSelect(fullPath, 'select', listIds))
    },
    onUnCheckAll: ({ getById, route, list }) => () => {
      const { push, location } = route
      const listIds = getIdsFromList(getById, list)
      const fullPath = getFullPathFromLocation(location)

      return push(removeItemFromSelect(fullPath, 'select', listIds))
    },
    onCheckItem: ({ route }) => (isChecked, id) => {
      const { push, location } = route
      const fullPath = getFullPathFromLocation(location)

      if (isChecked) {
        return push(addItemToSelect(fullPath, 'select', id))
      }

      return push(removeItemFromSelect(fullPath, 'select', id))
    }
  }),
  mapProps((props) => {
    const {
      classes,
      route,
      list,
      actions,
      dialogs,
      defaultRowsPerPage,
      searchEnable
    } = props

    const loading = prop('loading', list)
    const count = pathOr(0, ['data', 'count'], list)
    const selectIds = getSelectIdsFromRoute(route)
    const selectCount = length(selectIds)
    const listIsEmpty = !loading && length(path(['data', 'results'], list)) === 0
    const renderHeader = () => renderTableHeaderFromProps(props)
    const renderBody = () => renderTableBodyFromProps(props)

    return {
      classes,
      route,
      count,
      loading,
      dialogs,
      actions,
      defaultRowsPerPage,
      renderHeader,
      renderBody,
      listIsEmpty,
      selectCount,
      searchEnable
    }
  }),
  pure
)

const Table = ({ classes, loading, dialogs, actions, renderHeader, renderBody, route, ...props }) => {
  const { count, listIsEmpty, selectCount, searchEnable, defaultRowsPerPage } = props
  const selectCountVisible = selectCount !== 0

  return (
    <div className={classes.root}>
      <div>
        {dialogs}
        <div className={classNames(classes.header, { [classes.select]: selectCount })}>
          <div>
            <Render render={searchEnable}>
              <TableSearch className={classes.search} route={route} />
            </Render>
            {selectCountVisible && (
              <div className={classes.selectCount} data-test="table-select-count">
                {selectCount} selected
              </div>
            )}
            <div className={classes.actions}>
              {actions}
            </div>
          </div>
          <div>
            {renderHeader()}
          </div>
        </div>
        <div className={classes.body}>
          <Render render={loading}>
            <div className={classes.loader}>
              <CircularProgress
                size={75}
                color="secondary"
              />
            </div>
          </Render>
          <Fade
            in={!loading}
            className={classNames('', { [classes.hide]: loading })}>
            <div>
              {!loading && renderBody()}
            </div>
          </Fade>
          {listIsEmpty && <div>
            <div className={classes.noData}>
              <img src={NotFoundImage} />
              <div>
                <h4>Ooops, Item Not Found</h4>
                <span>Try rewording your search or entering a new keyword</span>
              </div>
            </div>
          </div>}
        </div>
        <div className={classes.footer}>
          <TableFooter route={route} count={count} defaultRowsPerPage={defaultRowsPerPage} />
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
  route: PropTypes.object.isRequired,
  actions: PropTypes.node,
  renderHeader: PropTypes.func.isRequired,
  renderBody: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  defaultRowsPerPage: PropTypes.number.isRequired,
  searchEnable: PropTypes.bool.isRequired,
  selectCount: PropTypes.number.isRequired,
  listIsEmpty: PropTypes.bool.isRequired,
}

export default enhance(Table)
