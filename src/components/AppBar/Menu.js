import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import MenuFullWidth from './MenuFullWidth'
import MenuIcon from './MenuIcon'
import menuList, { renderMenuList } from './MenuList'

const Menu = (props) => {
  const { open, showProfile } = props

  return open ? (
    <MenuFullWidth
      showProfile={showProfile}
      menuList={_.map(menuList, renderMenuList)}
    />
  ) : (
    <MenuIcon />
  )
}

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  showProfile: PropTypes.bool.isRequired
}

export default Menu
