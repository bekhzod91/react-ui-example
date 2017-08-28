import React from 'react'
import PropTypes from 'prop-types'
import MenuFullWidth from './MenuFullWidth'
import MenuIcon from './MenuIcon'
import menuList from './MenuList'

const Menu = ({ open, profile, showProfile }) => {
  return open ? (
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
  )
}

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  showProfile: PropTypes.bool.isRequired
}

export default Menu
