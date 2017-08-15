import React from 'react'
import PropTypes from 'prop-types'
import MenuFullWidth from './MenuFullWidth'
import MenuIcon from './MenuIcon'
import menuList from './MenuList'

const Menu = (props) => {
  const { open, showProfile } = props

  return open ? (
    <MenuFullWidth
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
  showProfile: PropTypes.bool.isRequired
}

export default Menu
