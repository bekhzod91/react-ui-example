import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import injectSheet from 'react-jss'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import AvPlaylistAdd from 'material-ui/svg-icons/av/playlist-add'
import BigSideBarMenu from './BigSidebarMenu'
import SmallSidebarMemu from './SmallSidebarMenu'
import SidebarIcon from './SidebarIcon'
import AccountIcon from './AccountIcon'
import * as STYLE from '../styles/style'
import logo from './assets/logo-icon.png'

const styles = {
  appBar: {
    left: '0px',
    width: 'auto !important',
    height: '65px !important',
    zIndex: '1310',
    right: '0 !important',
    position: 'fixed !important',
    backgroundColor: `${STYLE.PRIMARY_COLOR} !important`,
    boxShadow: `rgba(0, 0, 0, 0.14) 0px 3px 4px 0px,
    rgba(0, 0, 0, 0.12) 0px 3px 3px -2px,
    rgba(0, 0, 0, 0.2) 0px 1px 8px 0px`
  },
  appContent: {
    mozTransition: 'padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    oTransition: 'padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    webkitTransition: 'padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    transition: 'padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    paddingRight: '20px !important',
    paddingTop: '80px !important',
    paddingLeft: props => props.state ? '255px' : '50px',
    marginLeft: '25px',
  },
  sidebarMenu: {
    backgroundColor: `${STYLE.SECOND_TEXT_COLOR} !important`,
    top: '65px !important',
    transition: 'width 218ms !important'
  },
  title: {
    paddingLeft: '15px !important',
    color: `${STYLE.SECOND_TEXT_COLOR} !important`
  },
  logo: {
    paddingLeft: '10px'
  }
}

const enhance = compose(
  withState('state', 'setState', false),
  withState('account', 'setAccount', true),
  withHandlers({
    handleOpenMenu: props => () => {
      const { setState } = props
      setState(true)
    },
    handleCloseMenu: props => () => {
      const { setState } = props
      setState(false)
    },
    handleOpenAccount: props => () => {
      const { setAccount } = props
      setAccount(true)
    },
    handleCloseAccount: props => () => {
      const { setAccount } = props
      setAccount(false)
    }
  }),
  injectSheet(styles)
)

const Layout = enhance((props) => {
  const {
    classes,
    children,
    state,
    handleOpenMenu,
    handleCloseMenu,
    account,
    handleOpenAccount,
    handleCloseAccount
  } = props
  const sideBarState = state ? handleCloseMenu : handleOpenMenu
  const accountState = account ? handleCloseAccount : handleOpenAccount
  return (
    <div>
      <Toolbar className={classes.appBar}>
        <ToolbarGroup firstChild={true}>
          <div className={classes.logo}>
            <img src={logo} alt="logo" />
          </div>
          {state && <ToolbarTitle text="Unkata" className={classes.title} />}
          <SidebarIcon onTouchTap={sideBarState} position={state} />
          <AccountIcon onTouchTap={accountState} position={state} />
        </ToolbarGroup>
        <ToolbarGroup>
          <AvPlaylistAdd style={{ color: 'white' }} />
        </ToolbarGroup>
      </Toolbar>
      <Drawer
        open={true}
        containerClassName={classes.sidebarMenu}
        containerStyle={{ width: state ? '256px' : '56px' }}
      >
        {state ? <BigSideBarMenu state={state} account={account} />
          : <SmallSidebarMemu account={account} />}
      </Drawer>
      <div className={classes.appContent}>
        {children}
      </div>
    </div>
  )
})

Layout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.object.isRequired,
  state: PropTypes.bool,
  handleOpenMenu: PropTypes.func,
  handleCloseMenu: PropTypes.func,
  account: PropTypes.bool,
  handleOpenAccount: PropTypes.func,
  handleCloseAccount: PropTypes.func
}

export default Layout
