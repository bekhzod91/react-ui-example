import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import injectSheet from 'react-jss'
import { browserHistory } from 'react-router'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui-next/Avatar'
import IconButton from 'material-ui-next/IconButton'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui-next/Divider'
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from 'material-ui-icons/KeyboardArrowUp'
import AccountCircleIcon from 'material-ui-icons/AccountCircle'
import SettingsIcon from 'material-ui-icons/Settings'
import ExitToAppIcon from 'material-ui-icons/ExitToApp'
import * as STYLE from '../../styles/style'
import avatar from '../assets/photo.jpg'
import backgroundImage from '../assets/header-sm-01.jpg'

export const renderListItems = (item, index) => {
  const title = _.get(item, 'title')
  const icon = _.get(item, 'icon')
  const url = _.get(item, 'url')
  const children = _.get(item, 'children')

  if (!_.isEmpty(children)) {
    const style = index === 1 ? { borderLeft: `3px solid ${STYLE.PRIMARY_COLOR}`, background: STYLE.HOVER_COLOR } : {}

    return (
      <ListItem
        style={style}
        innerDivStyle={index === 1 ? { background: STYLE.HOVER_COLOR } : {}}
        nestedListStyle={style}
        hoverColor={STYLE.HOVER_COLOR}
        key={index}
        primaryText={title}
        leftIcon={icon}
        primaryTogglesNestedList={true}
        nestedItems={_.map(children, renderListItems)}
      />
    )
  }

  return (
    <ListItem
      key={index}
      hoverColor={STYLE.HOVER_COLOR}
      primaryText={title}
      onClick={() => browserHistory.push(url)}
      leftIcon={icon}
    />
  )
}

const styles = {
  wrapper: {
    width: 256
  },
  menu: {
    padding: '0px 0px !important'
  },
  nav: {
    paddingLeft: '36px',
    margin: '10px 0',
    fontSize: '13px',
    textTransform: 'uppercase'
  },
  avatarWrapper: {
    position: 'absolute',
    top: '15px',
    left: '10px'
  },
  avatar: {
    height: 80,
    width: 80
  },
  overlay: {
    paddingTop: '0'
  },
  cardTitle: {
    padding: '13px 16px'
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
  collapse: {
    position: 'absolute',
    right: '10px',
    top: '0',
    color: '#ccc',
  },
  dropDownButton: {
    height: '42px !important',
    padding: '10px !important'
  }
}

const enhance = compose(
  injectSheet(styles),
  withState('state', 'setState', false),
  withHandlers({
    handleShowSettings: ({ state, setState }) => () => setState(!state)
  })
)

const MenuFullWidth = ({ classes, state, logout, ...props }) => (
  <div>
    <Card
      style={styles.cardAnimation(props.showProfile)}
      initiallyExpanded={true}>
      <CardMedia
        overlayContentStyle={styles.overlay}
        overlay={
          <CardTitle
            style={styles.cardTitle}
            id="userEmail"
            subtitle={_.get(props, ['profile', 'email'])}
            expandable={false}>
            <div className={classes.collapse}>
              <IconButton
                className={classes.dropDownButton}
                onTouchTap={props.handleShowSettings}>
                {state ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </div>
          </CardTitle>
        }>
        <div className={classes.avatarWrapper}>
          <Avatar src={avatar} classes={{ root: classes.avatar }} />
        </div>
        <img src={backgroundImage} alt="" />
      </CardMedia>
    </Card>
    <div
      style={styles.cardAnimation(state)}>
      <List>
        <ListItem
          primaryText={'Profile'}
          leftIcon={<AccountCircleIcon />}
        />
        <ListItem
          primaryText={'Settings'}
          leftIcon={<SettingsIcon />}
        />
        <ListItem
          primaryText={'SignOut'}
          onTouchTap={() => logout()}
          leftIcon={<ExitToAppIcon />}
        />
      </List>
      <Divider />
    </div>
    <Subheader
      style={styles.nav}
      inset={true}>
      Navigation
    </Subheader>
    <List className={classes.menu}>
      {_.map(props.menuList, renderListItems)}
    </List>
  </div>
)

MenuFullWidth.propTypes = {
  classes: PropTypes.object.isRequired,
  showProfile: PropTypes.bool.isRequired,
  state: PropTypes.bool.isRequired,
  menuList: PropTypes.array.isRequired,
  handleShowSettings: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

export default enhance(MenuFullWidth)
