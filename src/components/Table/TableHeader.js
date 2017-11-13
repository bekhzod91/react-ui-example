import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui/styles/withStyles'
import Checkbox from 'material-ui/Checkbox'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.palette.primary['300'],
    color: theme.table.headerTextColor
  },
  checkbox: {
    marginRight: '5px'
  },
})

const TableHeader = ({ classes, children, route, ...props }) => {
  const { checkboxEnable, checkboxMinusChecked, checkboxIsChecked, onCheckAll, onUnCheckAll } = props

  return (
    <div className={classes.root}>
      {checkboxEnable && (
        <div className={classes.checkbox}>
          <Checkbox
            onChange={(event, value) => !checkboxMinusChecked && value ? onCheckAll() : onUnCheckAll()}
            checked={checkboxIsChecked}
            indeterminate={checkboxMinusChecked}
          />
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
  checkboxMinusChecked: PropTypes.bool.isRequired,
  checkboxIsChecked: PropTypes.bool.isRequired,
  onCheckAll: PropTypes.func.isRequired,
  onUnCheckAll: PropTypes.func.isRequired,
}

export default withStyles(styles)(TableHeader)
