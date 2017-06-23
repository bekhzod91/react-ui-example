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
  withState('expanded', 'setExpanded', false),
  injectSheet(styles)
)

const BigSideBarMenu = enhance((props) => {
  const { classes, expanded, setExpanded, state } = props
  const onExpandChange = expanded ? () => setExpanded(false) : () => setExpanded(true)
  return (
    <List className={classes.menu}>
      {_.get(state, 'account') &&
      <Card expanded={expanded} onExpandChange={onExpandChange} initiallyExpanded={_.get(state, 'account')}>
        <CardHeader
          title="Admin"
          subtitle="admin@example.com"
          avatar={avatar}
          showExpandableButton={_.get(state, 'open')}
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
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func
}

export default BigSideBarMenu
