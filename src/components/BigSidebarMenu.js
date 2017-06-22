import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
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
  withHandlers({
    handleOpenExpanded: props => () => {
      const { setExpanded } = props
      setExpanded(true)
    },
    handleCloseExpanded: props => () => {
      const { setExpanded } = props
      setExpanded(false)
    }
  }),
  injectSheet(styles)
)

const BigSideBarMenu = enhance((props) => {
  const {
    classes,
    expanded,
    handleOpenExpanded,
    handleCloseExpanded,
    state,
    account
  } = props
  const onExpandChange = expanded ? handleCloseExpanded : handleOpenExpanded
  return (
    <List className={classes.menu}>
      {account && <Card expanded={expanded} onExpandChange={onExpandChange} initiallyExpanded={account}>
        <CardHeader
          title="Admin"
          subtitle="admin@example.com"
          avatar={avatar}
          showExpandableButton={state}
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
  handleOpenExpanded: PropTypes.func,
  handleCloseExpanded: PropTypes.func,
  state: PropTypes.bool,
  account: PropTypes.bool
}

export default BigSideBarMenu
