import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import * as STYLE from '../../styles/style'
import logo from '../assets/logo-icon.png'
import IconButton from 'material-ui-next/IconButton'
import SidebarIcon from '../Icon/SidebarIcon'
import AccountIcon from '../Icon/AccountIcon'

const styles = {
  logo: {
    paddingLeft: '10px'
  },

  title: {
    paddingLeft: '15px !important',
    color: `${STYLE.SECOND_TEXT_COLOR} !important`
  },

  sidebar: {
    transform: props => _.get(props, 'menuOpen') ? 'scaleX(1)' : 'scaleX(-1)'
  },

  menuAction: {
    position: 'absolute',
    display: 'flex',
    transform: props => _.get(props, 'menuOpen') ? 'translate(250px)' : 'translate(50px)'
  }
}

const TopBarLeft = ({ classes, company, menuOpen, setMenuOpen, setVisibleProfile }) => {
  return (
    <ToolbarGroup firstChild={true}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>

      {menuOpen && <ToolbarTitle text={company} className={classes.title} />}

      <div className={classes.menuAction}>
        <IconButton
          className={classes.sidebar}
          onClick={setMenuOpen}>
          <SidebarIcon />
        </IconButton>

        <IconButton
          onClick={setVisibleProfile}>
          <AccountIcon />
        </IconButton>
      </div>
    </ToolbarGroup>
  )
}

TopBarLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.string.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  setVisibleProfile: PropTypes.func.isRequired,
}

export default injectSheet(styles)(TopBarLeft)
