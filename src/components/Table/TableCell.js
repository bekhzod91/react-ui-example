import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { compose, defaultProps, withHandlers } from 'recompose'
import withStyles from 'material-ui-next/styles/withStyles'
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward'
import { sortingUrl, sortingStatus } from '../../helpers/urls'

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
  iconWrapper: {
    position: 'absolute',
    top: 6,
    right: -24
  },
  icon: {
    width: '22px !important',
    height: '22px !important',
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

const FULL_WIDTH = 99.99999
const MAX_COLUMN = 12
const COLUMN_SIZE = FULL_WIDTH / MAX_COLUMN

const TableCell = ({ classes, children, ...props }) => {
  const { sort, columnSize, getSortingUrl, renderIcon, style } = props
  const icon = sort && renderIcon(sort)
  const onKeyPress = (event) => {
    event.preventDefault()
    if (event.keyCode === 0) {
      getSortingUrl(event, sort)
    }
  }

  return (
    <div style={{ ...style, width: `${columnSize * COLUMN_SIZE}%`, }}>
      {sort ? (<div>
        <a className={classes.button} onClick={(event) => getSortingUrl(event, sort)} onKeyPress={onKeyPress}>
          <span>{children}</span>
          {icon && (<div className={classes.iconWrapper}>{icon}</div>)}
        </a>
      </div>) : (
        <span className={classes.text}>{children}</span>
      )}
    </div>
  )
}

TableCell.defaultProps = {
  columnSize: 1
}

TableCell.propTypes = {
  columnSize: PropTypes.number,
  children: PropTypes.any,
  classes: PropTypes.object,
  style: PropTypes.object,
  route: PropTypes.shape({
    companyId: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired,
  getSortingUrl: PropTypes.func.isRequired,
  renderIcon: PropTypes.func.isRequired,
  sort: PropTypes.string
}

const enhance = compose(
  defaultProps({
    sort: null,
    columnSize: 1
  }),
  withStyles(styles),
  withHandlers({
    getSortingUrl: ({ route, sort }) => (event, value) => {
      const { location, push } = route
      const pathname = R.prop('pathname', location)
      const search = R.prop('search', location)
      const fullPath = `${pathname}${search}`

      event.preventDefault()

      return push(sortingUrl(fullPath, 'sort', value))
    },
    renderIcon: ({ classes, route, sort }) => (value) => {
      const { location } = route
      const pathname = R.prop('pathname', location)
      const search = R.prop('search', location)
      const fullPath = `${pathname}${search}`
      const icon = sortingStatus(fullPath, 'sort', value)

      return (<ArrowUpwardIcon
        className={classNames(classes.icon, {
          [classes.iconDesc]: icon === 'desc',
          [classes.iconAsc]: icon === 'asc',
          [classes.iconNot]: icon === 'not',
        })}
      />)
    }
  })
)

export default enhance(TableCell)
