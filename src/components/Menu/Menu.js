import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MenuIcon from './MenuIcon'
import MenuHeader from './MenuHeader'
import MenuList from './MenuList'

const styles = theme => ({
  root: {
    transition: '0.5s'
  },
  menu: {
    boxShadow: theme.shadows[5],
    position: 'fixed',
    minWidth: 'inherit',
    maxWidth: 'inherit',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: theme.menu.backgroundColor
  }
})

const Menu = ({ classes, ...props }) => {
  const width = props.openMenu ? 256 : 56

  return (
    <div className={classes.root} style={{ minWidth: width, maxWidth: width }}>
      <div className={classes.menu}>
        {props.openMenu ? (
          <div>
            <MenuHeader
              logout={props.logout}
              username={props.username}
              openProfile={props.openProfile} />
            <MenuList
              menus={props.menus}
              activeMenuName={props.activeMenuName} />
          </div>
        ) : (
          <MenuIcon
            openProfile={props.openProfile}
            menus={props.menus}
            activeMenuName={props.activeMenuName}
          />
        )}
      </div>
    </div>
  )
}

Menu.propTypes = {
  classes: PropTypes.object,
  openMenu: PropTypes.bool.isRequired,
  openProfile: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  menus: PropTypes.array.isRequired,
  activeMenuName: PropTypes.string.isRequired
}

export default withStyles(styles)(Menu)
