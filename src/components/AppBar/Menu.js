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
      width: 'inherit',
      height: '100%',
      backgroundColor: theme.menu.backgroundColor
    }
  }
}

const Menu = ({ classes, open, profile, showProfile }) => (
  <Motion defaultStyle={{ width: 56 }} style={{ width: open ? spring(256) : spring(56) }}>
    {value => <div style={{ width: value.width }}>
      <div className={classes.menu}>
        {open ? (
          <MenuFullWidth
            profile={profile}
            showProfile={showProfile}
            menuList={menuList}
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
  showProfile: PropTypes.bool.isRequired
}

export default withStyles(styles)(Menu)
