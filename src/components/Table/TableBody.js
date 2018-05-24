import React from 'react'
import { compose, length, equals } from 'ramda'
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { pure, componentFromStream, createEventHandler } from 'recompose'
import { addItemToSelect, removeItemFromSelect } from '../../helpers/urls'
import { addParamsRoute } from '../../helpers/route'
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
  pure
)

const TableBody = componentFromStream(props$ => {
  const { stream: onCheckItem$, handler: onCheckItem } = createEventHandler()
  const isEmpty = compose(equals(0), length)

  onCheckItem$
    .withLatestFrom(props$)
    .subscribe(([{ value, id }, { history }]) => {
      const search = history.location.search

      if (value) {
        const param = addItemToSelect(search, 'select', id)
        addParamsRoute({ 'select': param }, history)
      } else {
        const param = removeItemFromSelect(search, 'select', id)
        addParamsRoute({ 'select': param }, history)
      }
    })

  return props$.combineLatest(({ classes, ...props }) => (
    <div className={classes.body}>
      {props.loading && (
        <div className={classes.loader}>
          <CircularProgress size={75} color="secondary" />
        </div>
      )}

      {isEmpty(props.list) && (
        <div className={classes.empty}>
          <img src={NotFoundImage} />
          <div>
            <h4>Ooops, Item Not Found</h4>
            <span>Try rewording your search or entering a new keyword</span>
          </div>
        </div>
      )}

      {!props.loading && props.children.map((item) =>
        React.cloneElement(item, {
          withCheckbox: props.withCheckbox,
          onCheckItem: onCheckItem,
          id: item.key,
          isBody: true
        })
      )}
    </div>
  )
  )
})

TableBody.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.array,
  list: PropTypes.array,
  withCheckbox: PropTypes.bool,
  onCheckItem: PropTypes.func
}

export default enhance(TableBody)
