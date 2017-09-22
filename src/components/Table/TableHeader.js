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

const TableHeader = ({ classes, children, checkboxEnable, checkboxIsChecked, handleCheckAll }) => {
  return (
    <div className={classes.root}>
      {checkboxEnable && (
        <div className={classes.checkbox}>
          <Checkbox onChange={handleCheckAll} checked={checkboxIsChecked} />
        </div>
      )}
      {children}
    </div>
  )
}

TableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
  checkboxEnable: PropTypes.bool.isRequired,
  checkboxIsChecked: PropTypes.bool.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
}

export default withStyles(styles)(TableHeader)
