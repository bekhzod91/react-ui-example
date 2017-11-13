import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import * as STYLE from '../../styles/style'
import logo from '../assets/logo-icon.png'
import IconButton from 'material-ui/IconButton'
import SidebarIcon from '../Icon/SidebarIcon'
import AccountIcon from '../Icon/AccountIcon'

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

  sidebar: {
    transform: props => R.prop('menuOpen', props) ? 'scaleX(1)' : 'scaleX(-1)'
  },

  menuAction: {
    position: 'absolute',
    display: 'flex',
    transform: props => R.prop('menuOpen', props) ? 'translate(250px)' : 'translate(50px)'
  }
}

const TopBarLeft = ({ classes, company, menuOpen, setMenuOpen, setVisibleProfile }) => {
  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>

      {menuOpen && <h2 className={classes.title}>{company}</h2>}

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
    </div>
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
