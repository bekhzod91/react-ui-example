import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui-next/styles/withStyles'
import Checkbox from 'material-ui-next/Checkbox'

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
          <Checkbox onChange={(event, value) => console.log(value)} />
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
