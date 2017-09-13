import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui-next/styles/withStyles'
import Checkbox from 'material-ui-next/Checkbox'
import TableCell from './TableCell'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.table.backgroundColor
  },
  checkbox: {
    marginRight: '5px'
  },
})

const TableHeader = ({ classes, children, selected, selectIds }) => {
  return (
    <div className={classes.root}>
      {selected && (
        <div className={classes.checkbox}>
          <Checkbox />
        </div>
      )}
      {children}
    </div>
  )
}

TableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
  selected: PropTypes.bool.isRequired,
  selectIds: PropTypes.array.isRequired
}

export default withStyles(styles)(TableHeader)
