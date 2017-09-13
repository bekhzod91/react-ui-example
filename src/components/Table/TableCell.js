import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui-next/styles/withStyles'

const styles = {}

const FULL_WIDTH = 99.99999
const MAX_COLUMN = 12
const COLUMN_SIZE = FULL_WIDTH / MAX_COLUMN

const TableCell = ({ columnSize, children }) => {
  return (
    <div style={{ width: `${columnSize * COLUMN_SIZE}%` }}>
      <strong>{children}</strong>
    </div>
  )
}

TableCell.defaultProps = {
  columnSize: 1
}

TableCell.propTypes = {
  columnSize: PropTypes.number,
  children: PropTypes.any,
}

export default withStyles(styles)(TableCell)
