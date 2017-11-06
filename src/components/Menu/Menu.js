import React from 'react'
import PropTypes from 'prop-types'
import MenuHeader from './MenuHeader'
import MenuList from './MenuList'

const Menu = ({ route, logout, profile, profileIsVisible, menuList, activeMenuName }) => (
  <div>
    <MenuHeader
      logout={logout}
      profile={profile}
      profileIsVisible={profileIsVisible} />
    <MenuList
      route={route}
      menuList={menuList}
      activeMenuName={activeMenuName} />
  </div>
)

Menu.propTypes = {
  route: PropTypes.object.isRequired,
  profile: PropTypes.object,
  profileIsVisible: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  activeMenuName: PropTypes.string.isRequired,
  menuList: PropTypes.array.isRequired
}

export default Menu
