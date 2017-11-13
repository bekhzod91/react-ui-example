import _ from 'lodash'
import React from 'react'
import withStyles from 'material-ui/styles/withStyles'
import PropTypes from 'prop-types'
import MUIMenu, { MenuItem } from 'material-ui/Menu'

const styles = {
  wrapper: {
    left: '60px !important',
    marginTop: 8
  },
  menuContent: {
    display: 'flex',
    fontSize: '1em'
  },
  menuText: {
    marginLeft: 10
  },
  selected: {
    backgroundColor: '#fff'
  }
}

const renderItemContent = (item, index, classes, handleMenuItemTouch) => {
  const title = _.get(item, 'title')
  const icon = _.get(item, 'icon')

  return (
    <MenuItem
      key={index}
      classes={{ selected: classes.selected }}
      selected={index === 0}
      onClick={event => handleMenuItemTouch(event, index)}>
      <div key={index} className={classes.menuContent}>
        {icon}
        <span className={classes.menuText}>{title}</span>
      </div>
    </MenuItem>
  )
}

const Menu = ({ classes, open, options, anchorEl, handleMenuItemTouch, handleRequestClose }) => (
  <MUIMenu
    open={open}
    anchorEl={anchorEl}
    classes={{ root: classes.wrapper }}
    onRequestClose={handleRequestClose}>
    {_.map(options, (option, index) => renderItemContent(option, index, classes, handleMenuItemTouch))}
  </MUIMenu>
)

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  options: PropTypes.array,
  anchorEl: PropTypes.object,
  handleMenuItemTouch: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(Menu)
