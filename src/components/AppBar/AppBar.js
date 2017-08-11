import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import { Toolbar } from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import { getStorage, setStorage} from '../../helpers/localStorage'
import Menu from './Menu'
import TopBarLeft from './TopBarLeft'
import TopBarRight from './TopBarRight'
import * as STYLE from '../../styles/style'

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
    marginLeft: '25px',
    paddingTop: '80px !important',
    paddingRight: '20px !important',
    paddingLeft: props => _.get(props, ['state', 'open']) ? '255px' : '50px'
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
  injectSheet(styles),
  withState('state', 'setState', {
    menuOpen: getStorage('menuOpen', false),
    showProfile: getStorage('showProfile', false)
  })
)

const AppBar = ({ classes, children, title, state, setState }) => {
  const menuOpen = _.get(state, 'menuOpen')
  const showProfile = _.get(state, 'showProfile')
  const setMenuOpen = () => {
    setStorage('menuOpen', !menuOpen)
    setState({ ...state, menuOpen: !menuOpen })
  }
  const setShowProfile = () => {
    setStorage('showProfile', !showProfile)
    setState({ ...state, showProfile: !showProfile })
  }

  return (
    <div>
      <Toolbar className={classes.topBar}>
        <TopBarLeft
          title={title}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          setShowProfile={setShowProfile}
        />
        <TopBarRight />
      </Toolbar>

      <Drawer
        open={true}
        containerClassName={classes.drawer}
        containerStyle={styles.drawerContainer(menuOpen)}>
        <Menu
          open={menuOpen}
          showProfile={showProfile} />
      </Drawer>

      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired
}

export default enhance(AppBar)
