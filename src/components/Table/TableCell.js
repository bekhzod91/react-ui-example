import R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, defaultProps, withHandlers } from 'recompose'
import withStyles from 'material-ui-next/styles/withStyles'
import ButtonBase from 'material-ui-next/ButtonBase'
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward'
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward'
import { sortingUrl, sortingStatus } from '../../helpers/urls'

const styles = {
  button: {
    background: 'transparent',
    padding: '10px 10px 10px 10px',
    boxSizing: 'border-box',
    justifyContent: 'center'
  },
  text: {
    padding: '10px 10px 10px 10px',
    boxSizing: 'border-box',
  },
  icon: {
    display: 'inline-block',
    marginLeft: '10px',
    verticalAlign: 'middle'
  }
}

const FULL_WIDTH = 99.99999
const MAX_COLUMN = 12
const COLUMN_SIZE = FULL_WIDTH / MAX_COLUMN

const TableCell = ({ classes, children, ...props }) => {
  const { sort, columnSize, getSortingUrl, renderIcon } = props
  const icon = sort && renderIcon(sort)
  return (
    <div style={{ width: `${columnSize * COLUMN_SIZE}%` }}>
      {sort ? (<div>
        <ButtonBase className={classes.button} onClick={() => getSortingUrl(sort)} focusRipple={true}>
          <strong>{children}</strong>
        </ButtonBase>
        {icon && (<div className={classes.icon}>{icon}</div>)}
      </div>) : (<strong className={classes.text}>{children}</strong>)}
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
  withHandlers({
    getSortingUrl: ({ route, sort }) => (value) => {
      const { location, push } = route
      const pathname = R.prop('pathname', location)
      const search = R.prop('search', location)
      const fullPath = `${pathname}${search}`

      return push(sortingUrl(fullPath, 'sort', value))
    },
    renderIcon: ({ route, sort }) => (value) => {
      const { location } = route
      const pathname = R.prop('pathname', location)
      const search = R.prop('search', location)
      const fullPath = `${pathname}${search}`
      const icon = sortingStatus(fullPath, 'sort', value)

      if (icon === 'asc') {
        return (<ArrowDownwardIcon style={{ width: 20, height: 20 }} />)
      }

      if (icon === 'desc') {
        return (<ArrowUpwardIcon style={{ width: 20, height: 20 }} />)
      }

      return null
    }
  }),
  withStyles(styles)
)

export default enhance(TableCell)
