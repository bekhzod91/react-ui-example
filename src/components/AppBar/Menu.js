import React from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'
import withStyles from 'material-ui-next/styles/withStyles'
import MenuFullWidth from './MenuFullWidth'
import MenuIcon from './MenuIcon'
import menuList from './MenuList'

const styles = theme => {
  return {
    menu: {
      boxShadow: theme.shadows[5],
      position: 'fixed',
      minWidth: 'inherit',
      maxWidth: 'inherit',
      height: '100%',
      backgroundColor: theme.menu.backgroundColor
    }
  }
}

const Menu = ({ classes, open, profile, showProfile, logout }) => (
  <Motion defaultStyle={{ width: 56 }} style={{ width: open ? spring(256) : spring(56) }}>
    {value => <div style={{ minWidth: value.width, maxWidth: value.width }}>
      <div className={classes.menu}>
        {open ? (
          <MenuFullWidth
            profile={profile}
            showProfile={showProfile}
            menuList={menuList}
            logout={logout}
          />
        ) : (
          <MenuIcon
            showProfile={showProfile}
            menuList={menuList}
          />
        )}
      </div>
    </div>}
  </Motion>
)

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  showProfile: PropTypes.bool.isRequired
}

export default withStyles(styles)(Menu)
