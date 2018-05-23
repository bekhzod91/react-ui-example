import React from 'react'
import { compose, length, equals, path } from 'ramda'
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { pure, withHandlers, defaultProps } from 'recompose'
import { addItemToSelect, removeItemFromSelect } from '../../helpers/urls'
import { getFullPathFromLocation } from '../../helpers/get'
import NotFoundImage from './searchIcon.svg'

const styles = theme => ({
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

  empty: {
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
  withRouter,
  withStyles(styles),
  defaultProps({
    getById: path(['id']),
  }),
  withHandlers({
    onCheckItem: ({ history }) => (isChecked, id) => {
      const { push, location } = history
      const fullPath = getFullPathFromLocation(location)

      console.warn(fullPath)
      if (isChecked) {
        return push(addItemToSelect(fullPath, 'select', id))
      }

      return push(removeItemFromSelect(fullPath, 'select', id))
    }
  }),
  pure
)

const TableBody = ({ classes, ...props }) => {
  const empty = compose(equals(0), length)(props.list)

  return (
    <div className={classes.body}>
      {props.loading && (
        <div className={classes.loader}>
          <CircularProgress size={75} color="secondary" />
        </div>
      )}

      {empty && (
        <div className={classes.empty}>
          <img src={NotFoundImage} />
          <div>
            <h4>Ooops, Item Not Found</h4>
            <span>Try rewording your search or entering a new keyword</span>
          </div>
        </div>
      )}

      {props.children.map((item) =>
        React.cloneElement(item, {
          withCheckbox: props.withCheckbox,
          onCheckItem: props.onCheckItem,
          id: item.key,
          isBody: true
        })
      )}
    </div>
  )
}

TableBody.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.array,
  list: PropTypes.array,
  withCheckbox: PropTypes.bool,
  onCheckItem: PropTypes.func
}

export default enhance(TableBody)
