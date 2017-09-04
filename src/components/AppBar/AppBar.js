import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import withStyles from 'material-ui-next/styles/withStyles'
import Toolbar from 'material-ui-next/Toolbar'
import MUIAppBar from 'material-ui-next/AppBar'
import { getStorage, setStorage } from '../../helpers/localStorage'
import Menu from './Menu'
import TopBarLeft from './TopBarLeft'

const styles = theme => ({
  bodyWrapper: {
    position: 'relative',
    display: 'flex'
  },
  content: {
    padding: '10px'
  }
})

const enhance = compose(
  withState('state', 'setState', {
    menuOpen: getStorage('menuOpen', false),
    showProfile: getStorage('showProfile', false)
  }),
  withHandlers({
    setMenuOpen: ({ state, setState }) => () => {
      setStorage('menuOpen', !state.menuOpen)
      setState({ ...state, menuOpen: !state.menuOpen })
    },
    setShowProfile: ({ state, setState, ...props }) => () => {
      setStorage('showProfile', !state.showProfile)
      setState({ ...state, showProfile: !state.showProfile })
    }
  }),
  withStyles(styles)
)

const AppBar = ({ classes, children, title, profile, state, setMenuOpen, setShowProfile, logout }) => (
  <div>
    <MUIAppBar position="static">
      <Toolbar>
        <TopBarLeft
          title={title}
          profile={profile}
          menuOpen={state.menuOpen}
          setMenuOpen={setMenuOpen}
          setShowProfile={setShowProfile}
        />
      </Toolbar>
    </MUIAppBar>

    <div className={classes.bodyWrapper}>
      <Menu
        profile={profile}
        logout={logout}
        open={state.menuOpen}
        showProfile={state.showProfile} />
      <div className={classes.content}>
        {children}
      </div>
    </div>
  </div>
)

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  state: PropTypes.shape({
    menuOpen: PropTypes.bool.isRequired,
    showProfile: PropTypes.bool.isRequired
  }).isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  setShowProfile: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export const getProps = (props) => {
  return {
    logout: props.logoutAction,
    profile: {
      email: _.get(props, 'userEmail'),
      image: _.get(props, 'userImage'),
    },
    title: _.get(props, 'companyName')
  }
}

export default enhance(AppBar)
