import { compose, addIndex, map, prop } from 'ramda'
import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Avatar from '@material-ui/core/Avatar'
import Collapse from '@material-ui/core/Collapse'
import backgroundImage from '../Menu/header-sm-01.jpg'
import { checkMenuNameInsideMenu } from '../../helpers/menu'
import * as STYLE from '../../styles/style'
import avatar from './photo.jpg'

const STYLES_BG_IMG_SIZE = 65
const mapWithIndex = addIndex(map)

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

const enhance = compose(
  withRouter,
  withStyles(styles)
)

const MenuIcon = ({ classes, history, ...props }) => {
  const { openProfile, activeMenuName, menus } = props
  const checkMenuIsActive = checkMenuNameInsideMenu(activeMenuName)

  return (
    <div>
      <div>
        <Collapse in={openProfile}>
          <div className={classes.background}>
            <div className={classes.avatar}>
              <Avatar src={avatar} />
            </div>
          </div>
        </Collapse>
        <List>
          {mapWithIndex((item, index) => (
            <ListItem
              key={index}
              button={true}
              onClick={() => compose(history.push, prop('url'))(item)}
              className={checkMenuIsActive(item) ? classes.activeMenu : ''}>
              <ListItemIcon>
                {prop('icon', item)}
              </ListItemIcon>
            </ListItem>
          ), menus)}
        </List>
      </div>
    </div>
  )
}

MenuIcon.propTypes = {
  history: PropTypes.object.isRequired,
  openProfile: PropTypes.bool.isRequired,
  activeMenuName: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired,
}

export default enhance(MenuIcon)
