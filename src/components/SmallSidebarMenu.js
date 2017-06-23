import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ActionDashboard from 'material-ui/svg-icons/action/dashboard'
import ActionCardGiftcard from 'material-ui/svg-icons/action/card-giftcard'
import { Card, CardHeader } from 'material-ui/Card'
import avatar from './assets/photo.jpg'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

const SmallSidebarMemu = (props) => {
  const { state } = props
  return (
    <div>
      {_.get(state, 'account') && <Card>
        <CardHeader
          style={{ paddingLeft: '9px' }}
          avatar={avatar}
        />
      </Card>}
      <Menu>
        <MenuItem leftIcon={<ActionDashboard />} />
        <MenuItem leftIcon={<ActionCardGiftcard />} />
        <MenuItem leftIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem primaryText="Grid lines" checked={true} />,
            <MenuItem primaryText="Page breaks" insetChildren={true} />,
            <MenuItem primaryText="Rules" checked={true} />,
          ]}
        />
      </Menu>
    </div>
  )
}

SmallSidebarMemu.propTypes = {
  state: PropTypes.object
}

export default SmallSidebarMemu
