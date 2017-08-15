import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import * as STYLE from '../../styles/style'
import avatar from '../assets/photo.jpg'

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

const styles = {
  activeMenu: {
    borderLeft: `3px solid ${STYLE.PRIMARY_COLOR}`,
    backgroundColor: STYLE.HOVER_COLOR,
    marginRight: '4px'
  },
  inActiveMenu: {},
  avatar: {
    margin: '10px 0 0 10px'
  },
  cardAnimation: (animation) => {
    return animation ? {
      maxHeight: '500px',
      transition: 'max-height 1s ease-in',
      overflow: 'hidden'
    } : {
      maxHeight: '0',
      transition: 'max-height 0.5s ease-out',
      overflow: 'hidden'
    }
  },
  menuItemStyle: {
    width: '56px',
    borderRadius: '0px !important',
    padding: '0 0 8px 0',
  }
}

const MenuIcon = ({ classes, ...props }) => (
  <div>
    <Avatar
      src={avatar}
      style={styles.cardAnimation(props.showProfile)}
      className={classes.avatar}
    />
    <Menu
      value="cards"
      autoWidth={false}
      menuItemStyle={styles.menuItemStyle}
      selectedMenuItemStyle={styles.activeMenu}>
      {_.map(props.menuList, (item, index) => renderMenuItems(item, index, false))}
    </Menu>
  </div>
)

MenuIcon.propTypes = {
  showProfile: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  menuList: PropTypes.array.isRequired,
}

export default injectSheet(styles)(MenuIcon)
