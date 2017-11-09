import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui-next/styles/withStyles'
import MenuBig from '../Menu'
import MenuIcon from './MenuIcon'

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

const Menu = ({ classes, route, menuList, activeMenuName, ...props }) => {
  const { open, profile, profileIsVisible, logout } = props
  const width = open ? 256 : 56

  return (
    <div className={classes.root} style={{ minWidth: width, maxWidth: width }}>
      <div className={classes.menu}>
        {open ? (
          <MenuBig
            route={route}
            logout={logout}
            profile={profile}
            profileIsVisible={profileIsVisible}
            menuList={menuList}
            activeMenuName={activeMenuName}
          />
        ) : (
          <MenuIcon
            profileIsVisible={profileIsVisible}
            menuList={menuList}
          />
        )}
      </div>
    </div>
  )
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  route: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  profileIsVisible: PropTypes.bool.isRequired,
  menuList: PropTypes.array.isRequired,
  activeMenuName: PropTypes.string.isRequired
}

export default withStyles(styles)(Menu)
