import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import injectSheet from 'react-jss'
import { Toolbar } from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import { getStorage, setStorage } from '../../helpers/localStorage'
import Menu from './Menu'
import TopBarLeft from './TopBarLeft'
import TopBarRight from './TopBarRight'
import * as STYLE from '../../styles/style'
import * as STATE from '../../constants/state'

const styles = {
  topBar: {
    left: '0px',
    right: '0 !important',
    position: 'fixed !important',
    width: 'auto !important',
    height: '65px !important',
    zIndex: '1310',
    boxShadow: `rgba(0, 0, 0, 0.14) 0px 3px 4px 0px,
                rgba(0, 0, 0, 0.12) 0px 3px 3px -2px,
                rgba(0, 0, 0, 0.2) 0px 1px 8px 0px`,
    backgroundColor: `${STYLE.PRIMARY_COLOR} !important`
  },

  content: {
    transition: 'padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    marginLeft: props => _.get(props, ['state', 'menuOpen']) ? '256px' : '56px',
    paddingTop: '80px !important',
    paddingRight: '10px',
    paddingLeft: '10px'
  },

  drawer: {
    top: '65px !important',
    transition: 'width 218ms !important',
    overflow: 'visible !important',
    backgroundColor: `${STYLE.SECOND_TEXT_COLOR} !important`,
  },

  drawerContainer: (open) => ({ width: open ? '256px' : '56px' })
}

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
  injectSheet(styles)
)

const AppBar = ({ classes, children, title, profile, state, setMenuOpen, setShowProfile }) => (
  <div>
    <Toolbar className={classes.topBar}>
      <TopBarLeft
        title={title}
        profile={profile}
        menuOpen={state.menuOpen}
        setMenuOpen={setMenuOpen}
        setShowProfile={setShowProfile}
      />
      <TopBarRight />
    </Toolbar>

    <Drawer
      open={true}
      containerClassName={classes.drawer}
      containerStyle={styles.drawerContainer(state.menuOpen)}>
      <Menu
        profile={profile}
        open={state.menuOpen}
        showProfile={state.showProfile} />
    </Drawer>

    <div
      className={classes.content}>
      {children}
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

export const getAppBarState = (state, companyId) => {
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

export default enhance(AppBar)
