import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List'
import withStyles from 'material-ui/styles/withStyles'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Card, { CardActions, CardMedia } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Divider from 'material-ui/Divider'
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from 'material-ui-icons/KeyboardArrowUp'
import AccountCircleIcon from 'material-ui-icons/AccountCircle'
import SettingsIcon from 'material-ui-icons/Settings'
import ExitToAppIcon from 'material-ui-icons/ExitToApp'
import avatar from '../assets/photo.jpg'
import backgroundImage from '../assets/header-sm-01.jpg'

const styles = theme => ({
  card: {
    position: 'relative'
  },
  avatarWrapper: {
    position: 'absolute',
    top: 10,
    left: 10
  },
  avatar: {
    height: 80,
    width: 80
  },
  media: {
    height: 170
  },
  action: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'space-between',
    maxHeight: 42,
    padding: '0 !important',
    color: theme.menu.textColor
  },
  buttonWrapper: {
    position: 'absolute',
    right: '10px',
    top: '0',
  },
  button: {
    height: '42px !important',
    padding: '10px !important',
    color: theme.menu.textColor
  }
})

const enhance = compose(
  withStyles(styles),
  withState('settingsIsVisible', 'setSettingVisible', false),
  withHandlers({
    hideSettings: ({ settingsIsVisible, setSettingVisible }) => () => setSettingVisible(false),
    showSettings: ({ settingsIsVisible, setSettingVisible }) => () => setSettingVisible(true)
  })
)

const MenuHeader = ({ classes, logout, ...props }) => (
  <Collapse in={props.profileIsVisible}>
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={backgroundImage}>
        <div className={classes.avatarWrapper}>
          <Avatar src={avatar} classes={{ root: classes.avatar }} />
        </div>
      </CardMedia>
      <CardActions className={classes.action}>
        <div id="userEmail">
          {R.path(['profile', 'email'], props)}
        </div>
        <div className={classes.buttonWrapper}>
          <IconButton
            className={classes.button}
            onClick={props.settingsIsVisible ? props.hideSettings : props.showSettings}>
            {props.settingsIsVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </div>
      </CardActions>
    </Card>
    <Collapse in={props.settingsIsVisible}>
      <List>
        <ListItem button={true}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText inset={true} primary={'Profile'} />
        </ListItem>

        <ListItem button={true}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText inset={true} primary={'Settings'} />
        </ListItem>

        <ListItem button={true} onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText inset={true} primary={'SignOut'} />
        </ListItem>
      </List>
      <Divider />
    </Collapse>
  </Collapse>
)

MenuHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  profileIsVisible: PropTypes.bool.isRequired,
  settingsIsVisible: PropTypes.bool.isRequired,
  hideSettings: PropTypes.func.isRequired,
  showSettings: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

export default enhance(MenuHeader)
