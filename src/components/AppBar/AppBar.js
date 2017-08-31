import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import withStyles from 'material-ui-next/styles/withStyles'
import Toolbar from 'material-ui-next/Toolbar'
import MUIAppBar from 'material-ui-next/AppBar'
import { getStorage, setStorage } from '../../helpers/localStorage'
import { locationChange } from '../../store/location'
import Menu from './Menu'
import TopBarLeft from './TopBarLeft'
import * as STATE from '../../constants/state'

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

const AppBar = ({ classes, children, title, profile, state, setMenuOpen, setShowProfile }) => (
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
  profile: PropTypes.object.isRequired
}

export const mapStateToProps = (state, companyId) => {
  const company = _
    .chain(state)
    .get([STATE.USER_COMPANIES, 'data'])
    .filter((item) => item.id === _.toInteger(companyId))
    .first()
    .value()

  return {
    profile: {
      email: _.get(state, [STATE.USER_PROFILE, 'data', 'email']),
      image: _.get(state, [STATE.USER_PROFILE, 'data', 'image']),
    },
    title: _.get(company, 'name') || ''
  }
}

export const mapDispatchToProps = {
  locationChange
}

export default enhance(AppBar)
