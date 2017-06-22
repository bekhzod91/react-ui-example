import React from 'react'
import PropTypes from 'prop-types'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ActionDashboard from 'material-ui/svg-icons/action/dashboard'
import ActionCardGiftcard from 'material-ui/svg-icons/action/card-giftcard'
import { Card, CardHeader } from 'material-ui/Card'
import avatar from './assets/photo.jpg'

const SmallSidebarMemu = (props) => {
  const { account } = props
  return (
    <div>
      {account && <Card>
        <CardHeader
          style={{ paddingLeft: '9px' }}
          avatar={avatar}
        />
      </Card>}
      <Menu>
        <MenuItem leftIcon={<ActionDashboard />} />
        <MenuItem leftIcon={<ActionCardGiftcard />} />
      </Menu>
    </div>
  )
}

SmallSidebarMemu.propTypes = {
  account: PropTypes.bool
}

export default SmallSidebarMemu
