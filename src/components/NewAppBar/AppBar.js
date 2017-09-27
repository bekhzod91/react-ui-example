import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import { withStyles } from 'material-ui-next/styles'
import classNames from 'classnames'
import Drawer from 'material-ui-next/Drawer'
import MUIAppBar from 'material-ui-next/AppBar'
import Toolbar from 'material-ui-next/Toolbar'
import List from 'material-ui-next/List'
import Typography from 'material-ui-next/Typography'
import Divider from 'material-ui-next/Divider'
import IconButton from 'material-ui-next/IconButton'
import SidebarIcon from '../Icon/SidebarIcon'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import { getStorage, setStorage } from '../../helpers/localStorage'
import { Link } from 'react-router'

const drawerWidth = 240

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
    '& svg': {
      color: `${theme.appBar.buttonColor} !important`
    }
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    height: '100%',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
})

const enhance = compose(
  withState('state', 'setState', () => ({
    menuOpen: getStorage('menuOpen', false),
    showProfile: getStorage('showProfile', false)
  })),
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

const AppBar = ({ classes, children, state, setMenuOpen }) => {
  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <MUIAppBar className={classNames(classes.appBar, state.menuOpen && classes.appBarShift)}>
          <Toolbar disableGutters={true}>
            <IconButton
              aria-label="open drawer"
              onClick={() => setMenuOpen(true)}
              className={classes.menuButton}>
              <SidebarIcon />
            </IconButton>
            <Typography type="title" color="inherit" noWrap={true}>
              Mini variant drawer
            </Typography>
          </Toolbar>
        </MUIAppBar>
        <Drawer
          type="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !state.menuOpen && classes.drawerPaperClose),
          }}
          open={state.menuOpen}>
          <div className={classes.drawerInner}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={() => setMenuOpen(false)}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List className={classes.list}><Link to={'/c/0/company/'}>Company</Link></List>
            <Divider />
            <List className={classes.list}><Link to={'/c/0/'}>Company</Link></List>
          </div>
        </Drawer>
        <main className={classes.content}>
          {children}
        </main>
      </div>
    </div>
  )
}

AppBar.propTypes = {
  setMenuOpen: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
}

export default enhance(AppBar)
