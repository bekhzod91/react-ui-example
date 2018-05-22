import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
  root: {
    padding: '10px 10px 10px 10px',
    boxSizing: 'border-box'
  }
}

const FULL_WIDTH = 99.99999
const MAX_COLUMN = 12
const COLUMN_SIZE = FULL_WIDTH / MAX_COLUMN

const TableColumn = ({ classes, columnSize, item, index, content, style, ...props }) => {
  return (
    <div className={classes.root} style={{ width: `${columnSize * COLUMN_SIZE}%`, ...style }} {...props}>
      {/*content(item, index)*/}
    </div>
  )
}

TableColumn.defaultProps = {
  columnSize: 1
}

TableColumn.propTypes = {
  classes: PropTypes.object,
  columnSize: PropTypes.number,
  style: PropTypes.object,
  item: PropTypes.any,
  index: PropTypes.number,
  content: PropTypes.func
}

export default withStyles(styles)(TableColumn)
