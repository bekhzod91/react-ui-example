import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import { Toolbar } from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import LeftAppbar from './LeftAppbar'
import RightAppbar from './RightAppbar'
import BigSideBarMenu from './BigSidebarMenu'
import SmallSidebarMemu from './SmallSidebarMenu'
import * as STYLE from '../styles/style'

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
  content: {
    mozTransition: 'padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    oTransition: 'padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    webkitTransition: 'padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    transition: 'padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    paddingRight: '20px !important',
    paddingTop: '80px !important',
    paddingLeft: props => _.get(props, ['state', 'open']) ? '255px' : '50px',
    marginLeft: '25px',
  },
  sidebarMenu: {
    backgroundColor: `${STYLE.SECOND_TEXT_COLOR} !important`,
    top: '65px !important',
    transition: 'width 218ms !important'
  }
}

const enhance = compose(
  withState('state', 'setState', { open: false, account: true }),
  injectSheet(styles)
)

const Layout = enhance((props) => {
  const { classes, children, state, setState } = props
  return (
    <div>
      <Toolbar className={classes.appBar}>
        <LeftAppbar state={state} setState={setState} />
        <RightAppbar />
      </Toolbar>

      <Drawer
        open={true}
        containerClassName={classes.sidebarMenu}
        containerStyle={{ width: _.get(state, 'open') ? '256px' : '56px' }}
      >
        {_.get(state, 'open')
          ? <BigSideBarMenu state={state} /> : <SmallSidebarMemu state={state} />}
      </Drawer>

      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
})

Layout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.object.isRequired,
  state: PropTypes.object,
  setState: PropTypes.func
}

export default Layout
