import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import { Card, CardTitle, CardActions, CardMedia } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import ActionDns from 'material-ui/svg-icons/action/dns'
import KeyboardArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import avatar from '../assets/photo.jpg'
import backgroundImage from '../assets/header-sm-01.jpg'

const styles = {
  menu: {
    padding: '0px 0px !important'
  },
  nav: {
    paddingLeft: '36px',
    margin: '10px 0',
    fontSize: '13px',
    textTransform: 'uppercase'
  },
  avatar: {
    position: 'absolute',
    top: '15px',
    left: '10px'
  },
  overlay: {
    paddingTop: '0'
  },
  cardTitle: {
    padding: '12px 16px'
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
    top: '-2px',
    color: '#ccc',
  }
}

const enhance = compose(
  injectSheet(styles),
  withState('state', 'setState', false)
)

const MenuFullWidth = enhance(({ classes, showProfile, state, setState, menuList }) => {
  const onExpandChange = () => setState(!state)

  return (
    <List className={classes.menu}>
      <Card
        style={styles.cardAnimation(showProfile)}
        expanded={state}
        onExpandChange={onExpandChange}
        initiallyExpanded={true}>

        <CardMedia
          overlayContentStyle={styles.overlay}
          overlay={
            <CardTitle style={styles.cardTitle} subtitle="admin@example.com" expandable={false}>
              <div className={classes.collapse}>
                <IconButton>
                  <KeyboardArrowDownIcon />
                </IconButton>
              </div>
            </CardTitle>
          }>
          <div className={classes.avatar}>
            <Avatar src={avatar} size={80} />
          </div>
          <img src={backgroundImage} alt="" />
        </CardMedia>
        <CardActions expandable={true}>
          <List>
            <ListItem
              primaryText="profile"
              leftIcon={<ActionDns />}
            />
          </List>
        </CardActions>
      </Card>
      <Subheader
        style={styles.nav}
        inset={true}>
        Navigation
      </Subheader>
      {menuList}
    </List>
  )
})

MenuFullWidth.propTypes = {
  classes: PropTypes.object.isRequired,
  showProfile: PropTypes.object.isRequired,
  state: PropTypes.bool,
  setState: PropTypes.func
}

export default enhance(MenuFullWidth)
