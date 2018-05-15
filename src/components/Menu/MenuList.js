import { map, addIndex } from 'ramda'
import { compose } from 'recompose'
import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import withStyles from '@material-ui/core/styles/withStyles'
import MenuListItem from '../Menu/MenuListItem'

const styles = theme => ({
  button: {
    '&:hover': {
      backgroundColor: theme.menu.buttonHover
    },
    '&:focus': {
      backgroundColor: theme.menu.buttonHover
    }
  }
})

const MenuList = ({ classes, menus, activeMenuName }) => (
  <List component="nav" subheader={<ListSubheader>Navigation</ListSubheader>}>
    {addIndex(map)((item, index) => (
      <MenuListItem
        key={index}
        item={item}
        isRoot={true}
        className={classes.button}
        activeMenuName={activeMenuName}
      />
    ), menus)}
  </List>
)

MenuList.propTypes = {
  classes: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired,
  activeMenuName: PropTypes.string.isRequired
}

export default compose(
  withStyles(styles)
)(MenuList)
