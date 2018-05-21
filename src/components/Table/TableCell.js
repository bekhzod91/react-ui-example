import {
  append,
  endsWith,
  equals,
  filter,
  findLast,
  isEmpty,
  isNil,
  join,
  not,
  pathOr,
  compose,
  prop,
  reverse,
  split
} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import { branch, renderComponent, componentFromStream, createEventHandler } from 'recompose'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { parseParams } from '../../helpers/urls'
import { addParamsRoute } from '../../helpers/route'

export const sortingStatus = (url, key, value) => {
  const params = parseParams(url)
  const currentValue = compose(
    findLast(endsWith(value)),
    split(','),
    pathOr('', [key])
  )(params)

  if (isNil(currentValue)) {
    return 'not'
  }

  return compose(
    descSort => descSort ? 'desc' : 'asc',
    equals('-'),
    prop(0),
  )(currentValue)
}

export const nextOrderingParams = (url, key, value) => {
  const params = parseParams(url)
  const sortValues = prop(key, params) || ''
  const possibleValue = { 'not': value, 'asc': `-${value}`, 'desc': '' }
  const status = sortingStatus(url, key, value)
  const newValue = compose(
    join(','),
    reverse,
    filter(compose(not, isEmpty)),
    append(prop(status, possibleValue)),
    filter(compose(not, endsWith(value))),
    split(','),
  )(sortValues)

  return { [key]: newValue }
}

const styles = theme => ({
  button: {
    cursor: 'pointer',
    display: 'inline-block',
    background: 'transparent',
    padding: '10px 10px 10px 10px',
    boxSizing: 'border-box',
    justifyContent: 'center',
    color: theme.table.headerTextColor,
    position: 'relative',
    '&:focus': {
      outline: 0,
      '&:before': {
        left: 0,
        width: '100%'
      }
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      height: 1,
      width: 0,
      left: '50%',
      background: theme.table.headerTextColor,
      transition: '0.5s',
      bottom: 2
    }
  },
  text: {
    padding: '10px 10px 10px 10px',
    boxSizing: 'border-box',
  },
  ordering: {
    position: 'absolute',
    top: 6,
    right: -24
  },
  icon: {
    width: '22px !important',
    height: '22px !important',
    transition: '0.5s',
    color: `${theme.table.headerTextColor} !important`
  },
  iconAsc: {
    transform: 'none'
  },
  iconDesc: {
    transform: 'rotate(180deg)'
  },
  iconNot: {
    transform: 'rotate(90deg)',
    opacity: 0
  }
})

const enhance = compose(
  withRouter,
  withStyles(styles),
  branch(
    compose(not, prop('sortKey')),
    renderComponent(props => {
      return (
        <Grid item={true} xs={props.columnSize}>
          <span className={props.classes.text}>{props.children}</span>
        </Grid>
      )
    })
  )
)

const TableCell = componentFromStream(props$ => {
  const { stream: onClick$, handler: onClick } = createEventHandler()
  const { stream: onKeyPress$, handler: onKeyPress } = createEventHandler()

  onKeyPress$
    .withLatestFrom(props$)
    .subscribe(([event, { history, sortKey }]) => {
      event.preventDefault()
      if (event.key === 'Enter') {
        const params = nextOrderingParams(history.location.search, 'sort', sortKey)

        addParamsRoute(params, history)
      }
    })

  onClick$
    .withLatestFrom(props$)
    .subscribe(([event, { history, sortKey }]) => {
      event.preventDefault()
      const params = nextOrderingParams(history.location.search, 'sort', sortKey)

      addParamsRoute(params, history)
    })

  return props$.combineLatest(({ classes, history, ...props }) => {
    const search = history.location.search
    const orderStatus = sortingStatus(search, 'sort', props.sortKey)

    return (
      <Grid item={true} xs={props.columnSize}>
        <a tabIndex="0"
          className={classes.button}
          onClick={onClick}
          onKeyPress={onKeyPress}>
          <span>{props.children}</span>
          <div className={classes.ordering}>
            <ArrowUpwardIcon
              className={classNames(classes.icon, {
                [classes.iconDesc]: orderStatus === 'desc',
                [classes.iconAsc]: orderStatus === 'asc',
                [classes.iconNot]: orderStatus === 'not',
              })}
            />
          </div>
        </a>
      </Grid>
    )
  })
})

TableCell.defaultProps = {
  columnSize: 1,
  sortKey: null
}

TableCell.propTypes = {
  classes: PropTypes.object,
  columnSize: PropTypes.number,
  children: PropTypes.any,
  sortKey: PropTypes.string
}

export default enhance(TableCell)
