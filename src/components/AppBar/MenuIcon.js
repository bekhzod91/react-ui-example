import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import { Motion, spring } from 'react-motion'
import * as STYLE from '../../styles/style'
import avatar from '../assets/photo.jpg'
import backgroundImage from '../assets/header-sm-01.jpg'

const STYLES_BG_IMG_SIZE = 65
const styles = {
  activeMenu: {
    borderLeft: `3px solid ${STYLE.PRIMARY_COLOR}`,
    backgroundColor: STYLE.HOVER_COLOR,
    marginRight: '4px'
  },
  profileBackground: {
    padding: '0',
    height: STYLES_BG_IMG_SIZE,
    width: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  avatar: {
    margin: '10px 8px 10px'
  },
  profileAnimation: ({ height }) => {
    return height !== STYLES_BG_IMG_SIZE ? {
      transform: `translate3d(0, -${height}px, 0)`
    } : {}
  },
  menu: {
    maxWidth: '56px'
  },
  menuItemStyle: {
    width: '56px',
    borderRadius: '0px !important',
    padding: '0 0 8px 0',
  }
}

const MenuIcon = ({ classes, ...props }) => (
  <div>
    <Motion style={{ height: spring(props.showProfile ? 0 : STYLES_BG_IMG_SIZE) }}>
      {(options) => (
        <div style={styles.profileAnimation(options)}>
          {options.height !== STYLES_BG_IMG_SIZE && <div
            className={classes.profileBackground}>
            <Avatar
              src={avatar}
              className={classes.avatar}
            />
          </div>}
          <Menu
            style={styles.menu}
            value="cards"
            menuItemStyle={styles.menuItemStyle}
            selectedMenuItemStyle={styles.activeMenu}>
            {_.map(props.menuList, (item, index) => renderMenuItems(item, index, false))}
          </Menu>
        </div>
      )}
    </Motion>
  </div>
)

MenuIcon.propTypes = {
  showProfile: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  menuList: PropTypes.array.isRequired,
}

export const renderMenuItems = (item, index, showTitle) => {
  const title = _.get(item, 'title')
  const icon = _.get(item, 'icon')
  const name = _.get(item, 'name')
  const children = _.get(item, 'children')

  if (!_.isEmpty(children)) {
    return (
      <MenuItem
        key={index}
        leftIcon={icon}
        value={name}
        anchorOrigin={{ horizontal:'right', vertical:'top' }}
        targetOrigin={{ horizontal:'left', vertical:'top' }}
        menuItems={_.map(children, (item, index) => renderMenuItems(item, index, true))}
      />
    )
  }

  return (
    <MenuItem
      key={index}
      primaryText={showTitle ? title : null}
      value={name}
      leftIcon={icon}
    />
  )
}

export default injectSheet(styles)(MenuIcon)
