import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import withStyles from '@material-ui/core/styles/withStyles'
import Toolbar from '@material-ui/core/Toolbar'
import MUIAppBar from '@material-ui/core/AppBar'
import Menu from '../Menu/Menu'
import { getStorage, setStorage } from '../../helpers/localStorage'
import { getMenusByPermissions } from '../../helpers/menu'
import menus from '../../constants/menus'
import TopBarLeft from './TopBarLeft'

const styles = {
  bodyWrapper: {
    position: 'relative',
    display: 'flex',
    paddingTop: '56px'
  },
  content: {
    transition: '0.5s',
    padding: '20px 20px',
    flex: '1'
  },
  '@media (min-width: 600px)': {
    bodyWrapper: {
      paddingTop: '64px'
    }
  }
}

const enhance = compose(
  withState('state', 'setState', () => ({
    openMenu: getStorage('openMenu', false),
    openProfile: getStorage('openProfile', false)
  })),
  withHandlers({
    handlerMenuClick: ({ state, setState }) => () => {
      setStorage('openMenu', !state.openMenu)
      setState({ ...state, openMenu: !state.openMenu })
    },
    handlerProfileClick: ({ state, setState, }) => () => {
      setStorage('openProfile', !state.openProfile)
      setState({ ...state, openProfile: !state.openProfile })
    }
  }),
  withStyles(styles)
)

const AppBar = ({ classes, state, ...props }) => {
  return (
    <div>
      <MUIAppBar position="fixed">
        <Toolbar>
          <TopBarLeft
            title="GS1"
            open={state.openMenu}
            onMenuClick={props.handlerMenuClick}
            onProfileClick={props.handlerProfileClick}
          />
        </Toolbar>
      </MUIAppBar>

      <div className={classes.bodyWrapper}>
        <Menu
          username={props.username}
          openMenu={state.openMenu}
          openProfile={state.openProfile}
          menus={getMenusByPermissions(menus, props.permissions)}
          logout={props.logout}
          activeMenuName={props.active}
        />
        <div className={classes.content}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

AppBar.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  state: PropTypes.object,
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
  handlerMenuClick: PropTypes.func,
  handlerProfileClick: PropTypes.func,
  permissions: PropTypes.array,
  active: PropTypes.string.isRequired,
}

export default enhance(AppBar)
