import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import AccountIcon from '../Icon/AccountIcon'
import SidebarIcon from '../Icon/SidebarIcon'
import * as STYLE from '../../styles/style'
import logo from './logo-icon.png'

const styles = {
  root: {
    position: 'relative',
    marginLeft: -24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    paddingLeft: '10px'
  },

  title: {
    paddingLeft: '15px !important',
    color: `${STYLE.SECOND_TEXT_COLOR} !important`
  },

  action: {
    position: 'absolute',
    display: 'flex'
  }
}

const TopBarLeft = ({ classes, ...props }) => {
  const actionStyle = { transform: props.open ? 'translate(250px)' : 'translate(50px)' }
  const sidebarStyle = { transform: props.open ? 'scaleX(1)' : 'scaleX(-1)' }

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>

      {props.open && <h2 className={classes.title}>GS1</h2>}

      <div style={actionStyle} className={classes.action}>
        <IconButton style={sidebarStyle} onClick={props.onMenuClick}>
          <SidebarIcon />
        </IconButton>

        <IconButton onClick={props.onProfileClick}>
          <AccountIcon />
        </IconButton>
      </div>
    </div>
  )
}

TopBarLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(TopBarLeft)
