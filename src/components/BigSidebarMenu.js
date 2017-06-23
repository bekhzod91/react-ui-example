import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState } from 'recompose'
import injectSheet from 'react-jss'
import { List, ListItem } from 'material-ui/List'
import { Card, CardHeader, CardActions } from 'material-ui/Card'
import ContentSend from 'material-ui/svg-icons/content/send'
import ContentDrafts from 'material-ui/svg-icons/content/drafts'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ActionDashboard from 'material-ui/svg-icons/action/dashboard'
import ActionCardGiftcard from 'material-ui/svg-icons/action/card-giftcard'
import Subheader from 'material-ui/Subheader'
import avatar from './assets/photo.jpg'

const styles = {
  menu: {
    padding: '0px 0px !important'
  }
}

const enhance = compose(
  withState('state', 'setState', false),
  injectSheet(styles)
)

const BigSideBarMenu = enhance((props) => {
  const { classes, open, state, setState } = props
  const openState = _.get(open, 'open')
  const accountState = _.get(open, 'account')
  const onExpandChange = state ? () => setState(false) : () => setState(true)
  return (
    <List className={classes.menu}>
      {accountState && <Card
        expanded={state}
        onExpandChange={onExpandChange}
        initiallyExpanded={accountState}>

        <CardHeader
          title="Admin"
          subtitle="admin@example.com"
          avatar={avatar}
          showExpandableButton={openState}
        />
        <CardActions expandable={true}>
          <List>
            <ListItem
              primaryText="profile"
              leftIcon={<ActionGrade />}
            />
          </List>
        </CardActions>
      </Card>}
      <Subheader inset={true}>Navigation</Subheader>
      <ListItem
        primaryText="Dashboard"
        leftIcon={<ActionDashboard />}
      />
      <ListItem
        primaryText="Cards"
        leftIcon={<ActionCardGiftcard />}
        initiallyOpen={false}
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
          />
        ]}
      />
    </List>
  )
})

BigSideBarMenu.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.object,
  state: PropTypes.bool,
  setState: PropTypes.func
}

export default BigSideBarMenu
