import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import withStyles from 'material-ui-next/styles/withStyles'
import Toolbar from 'material-ui-next/Toolbar'
import MUIAppBar from 'material-ui-next/AppBar'
import { getStorage, setStorage } from '../../helpers/localStorage'
import menus from '../../constants/menus'
import { getMenuWithCompanyId, getMenusByPermissions } from '../../helpers/menu'
import { getRouteFromProps } from '../../helpers/get'
import Menu from './Menu'
import TopBarLeft from './TopBarLeft'

const styles = theme => ({
  bodyWrapper: {
    position: 'relative',
    display: 'flex',
    paddingTop: '56px'
  },
  content: {
    transition: '0.5s',
    padding: '15px 20px',
    flex: '1'
  },
  '@media (min-width: 600px)': {
    bodyWrapper: {
      paddingTop: '64px'
    }
  }
})

const AppBar = ({ classes, children, state, route, menuList, activeMenuName, ...props }) => (
  <div>
    <MUIAppBar position="fixed">
      <Toolbar>
        <TopBarLeft
          company={props.company}
          menuOpen={state.menuOpen}
          setMenuOpen={props.setMenuOpen}
          setVisibleProfile={props.setProfileVisible}
        />
      </Toolbar>
    </MUIAppBar>

    <div className={classes.bodyWrapper}>
      <Menu
        route={route}
        open={state.menuOpen}
        logout={props.logout}
        profile={props.profile}
        profileIsVisible={state.profileIsVisible}
        menuList={menuList}
        activeMenuName={activeMenuName}
      />
      <div className={classes.content}>
        {children}
      </div>
    </div>
  </div>
)

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  state: PropTypes.shape({
    menuOpen: PropTypes.bool.isRequired,
    profileIsVisible: PropTypes.bool.isRequired
  }).isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  setProfileVisible: PropTypes.func.isRequired,
  company: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  menuList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    permission: PropTypes.string,
    children: PropTypes.array
  })).isRequired,
  activeMenuName: PropTypes.string.isRequired,
}

const enhance = compose(
  withState('state', 'setState', () => ({
    menuOpen: getStorage('menuOpen', false),
    profileIsVisible: getStorage('profileIsVisible', false)
  })),
  withHandlers({
    setMenuOpen: ({ state, setState }) => () => {
      setStorage('menuOpen', !state.menuOpen)
      setState({ ...state, menuOpen: !state.menuOpen })
    },
    setProfileVisible: ({ state, setState, }) => () => {
      setStorage('profileIsVisible', !state.profileIsVisible)
      setState({ ...state, profileIsVisible: !state.profileIsVisible })
    }
  }),
  withStyles(styles)
)

export const getProps = (props) => {
  const permissions = R.pathOr([], ['permission', 'data'], props)
  const route = getRouteFromProps(props)

  return {
    logout: props.logoutAction,
    profile: {
      email: R.prop('userEmail', props),
      image: R.prop('userImage', props),
    },
    company: R.prop('companyName', props),
    menuList: R.compose(
      getMenuWithCompanyId(R.__, parseInt(route.companyId)),
      getMenusByPermissions(R.__, permissions)
    )(menus),
    route,
  }
}

export default enhance(AppBar)
