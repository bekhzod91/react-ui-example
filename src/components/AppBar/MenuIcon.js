import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui/styles/withStyles'
import List, { ListItem, ListItemIcon } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Collapse from 'material-ui/transitions/Collapse'
import * as STYLE from '../../styles/style'
import { checkMenuNameInsideMenu } from '../../helpers/menu'
import avatar from '../assets/photo.jpg'
import backgroundImage from '../assets/header-sm-01.jpg'

const STYLES_BG_IMG_SIZE = 65
const map = R.addIndex(R.map)

const styles = theme => ({
  activeMenu: {
    borderLeft: `3px solid ${theme.palette.secondary[500]}`,
    backgroundColor: STYLE.HOVER_COLOR
  },
  background: {
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
  }
})

const MenuIcon = ({ classes, route, ...props }) => {
  const { push } = route
  const { profileIsVisible, activeMenuName, menuList } = props
  const checkMenuIsActive = checkMenuNameInsideMenu(activeMenuName)

  return (
    <div>
      <div>
        <Collapse in={profileIsVisible}>
          <div className={classes.background}>
            <div className={classes.avatar}>
              <Avatar src={avatar} />
            </div>
          </div>
        </Collapse>
        <List>
          {map((item, index) => (
            <ListItem
              key={index}
              button={true}
              onClick={() => push(R.prop('url', item))}
              className={checkMenuIsActive(item) ? classes.activeMenu : ''}>
              <ListItemIcon>
                {R.prop('icon', item)}
              </ListItemIcon>
            </ListItem>
          ), menuList)}
        </List>
      </div>
    </div>
  )
}

MenuIcon.propTypes = {
  route: PropTypes.object.isRequired,
  profileIsVisible: PropTypes.bool.isRequired,
  activeMenuName: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  menuList: PropTypes.array.isRequired,
}

export default withStyles(styles)(MenuIcon)
