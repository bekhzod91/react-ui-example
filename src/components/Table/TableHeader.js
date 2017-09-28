import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui-next/styles/withStyles'
import Checkbox from 'material-ui-next/Checkbox'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.table.backgroundColor,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px -1px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)'
  },
  checkbox: {
    marginRight: '5px'
  },
})

const TableHeader = ({ classes, children, route, ...props }) => {
  const { checkboxEnable, checkboxIsChecked, handleCheckAll } = props

  return (
    <div className={classes.root}>
      {checkboxEnable && (
        <div className={classes.checkbox}>
          <Checkbox onChange={(event, value) => handleCheckAll(value)} checked={checkboxIsChecked} />
        </div>
      )}
      {React.Children.map(children, child => React.cloneElement(child, { route }))}
    </div>
  )
}

TableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
  route: PropTypes.shape({
    companyId: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired,
  checkboxEnable: PropTypes.bool.isRequired,
  checkboxIsChecked: PropTypes.bool.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
}

export default withStyles(styles)(TableHeader)
