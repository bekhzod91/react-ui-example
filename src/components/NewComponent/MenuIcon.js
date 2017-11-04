import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState } from 'recompose'
import withStyles from 'material-ui-next/styles/withStyles'
import List, { ListItem } from 'material-ui-next/List'
import Avatar from 'material-ui-next/Avatar'
import Menu from './Menu'
import * as STYLE from '../../styles/style'
import avatar from '../assets/photo.jpg'
import backgroundImage from '../assets/header-sm-01.jpg'

const STYLES_BG_IMG_SIZE = 65
const styles = {
  active: {
    borderLeft: `3px solid ${STYLE.PRIMARY_COLOR}`,
    backgroundColor: STYLE.HOVER_COLOR
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
    padding: '10px 8px 10px'
  },
  profileAnimation: ({ height }) => {
    return height !== STYLES_BG_IMG_SIZE ? {
      transform: `translate3d(0, -${height}px, 0)`
    } : {}
  },
  menu: {
    maxWidth: 'inherit'
  },
  menuItemStyle: {
    borderRadius: '0px !important',
    padding: '0 0 8px 0',
  }
}

const MenuIcon = ({ classes, state, setState, ...props }) => (
  <div>
    <div style={styles.profileAnimation(STYLES_BG_IMG_SIZE)}>
      <div
        className={classes.profileBackground}>
        <div className={classes.avatar}>
          <Avatar src={avatar} />
        </div>
      </div>

      <List>
        {_.map(props.menuList, (item, index) => renderListItems(item, index, false, setState))}
      </List>

      <Menu
        open={state.open}
        anchorEl={state.anchorEl}
        options={state.children}
        handleMenuItemTouch={() => setState({ open: false, anchorEl: null })}
        handleRequestClose={(event) => setState({ open: false, anchorEl: null })}
      />
    </div>
  </div>
)

MenuIcon.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  showProfile: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  menuList: PropTypes.array.isRequired,
}

const renderListItems = (item, index, showTitle, setState) => {
  const icon = _.get(item, 'icon')
  const children = _.get(item, 'children')

  if (!_.isEmpty(children)) {
    return (
      <ListItem
        key={index}
        button={true}
        onClick={(event) => setState({
          open: true,
          anchorEl: event.currentTarget,
          children: _.get(item, 'children')
        })}>
        {icon}
      </ListItem>
    )
  }

  return (
    <ListItem
      key={index}
      button={true}
      onClick={(event) => console.log('Work')}>
      {icon}
    </ListItem>
  )
}

const enhance = compose(
  withState('state', 'setState', { open: false, anchorEl: null, children: null }),
  withStyles(styles)
)

export default enhance(MenuIcon)
