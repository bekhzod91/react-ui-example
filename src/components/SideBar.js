import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import injectSheet from 'react-jss'
import SidebarIcon from './SidebarIcon'
import * as STYLE from '../styles/style'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import ContentSend from 'material-ui/svg-icons/content/send'
import ContentDrafts from 'material-ui/svg-icons/content/drafts'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ContentInbox from 'material-ui/svg-icons/content/inbox'

const styles = {
  appBar: {
    mozTransition: 'left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    oTransition: 'left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    webkitTransition: 'left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    transition: 'left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    left: '0px',
    width: 'auto !important',
    right: '0 !important',
    position: 'fixed !important'
  },
  appContent: {
    mozTransition: 'padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    oTransition: 'padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    webkitTransition: 'padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    transition: 'padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1)',
    paddingRight: '20px !important',
    paddingTop: '64px !important',
    paddingLeft: props => props.state ? '255px' : '0',
    marginLeft: '20px'
  },
  sidebarMenu: {
    backgroundColor: STYLE.SECOND_TEXT_COLOR,
    top: '64px'
  }
}

const enhance = compose(
  withState('state', 'setState', false),
  withHandlers({
    handleOpenMenu: props => () => {
      const { setState } = props
      setState(true)
    },
    handleCloseMenu: props => () => {
      const { setState } = props
      setState(false)
    }
  }),
  injectSheet(styles)
)

const SideBar = enhance((props) => {
  return (
    <div>
      <AppBar
        className={props.classes.appBar}
        onLeftIconButtonTouchTap={props.handleOpenMenu}
        title="How long have you been alive?"
        iconElementRight={<SidebarIcon />}
      />
      <Drawer
        docked={false}
        open={props.state}
        onRequestChange={props.handleCloseMenu}
        containerStyle={styles.sidebarMenu}
      >
        <List>
          <Subheader>Nested List Items</Subheader>
          <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
          <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
          <ListItem
            primaryText="Inbox"
            leftIcon={<ContentInbox />}
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem
                key={1}
                primaryText="Starred"
                leftIcon={<ActionGrade />}
              />,
              <ListItem
                key={2}
                primaryText="Sent Mail"
                leftIcon={<ContentSend />}
                disabled={true}
                nestedItems={[
                  <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                ]}
              />,
              <ListItem
                key={3}
                primaryText="Inbox"
                leftIcon={<ContentInbox />}
                open={props.state}
                nestedItems={[
                  <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                ]}
              />,
            ]}
          />
        </List>
      </Drawer>
      <div className={props.classes.appContent}>{props.children}</div>
    </div>
  )
})

export default SideBar
