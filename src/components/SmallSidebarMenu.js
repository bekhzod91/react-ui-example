import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ActionDashboard from 'material-ui/svg-icons/action/dashboard'
import ActionCardGiftcard from 'material-ui/svg-icons/action/card-giftcard'
import { Card, CardHeader } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import avatar from './assets/photo.jpg'
import ActionDns from 'material-ui/svg-icons/action/dns'

const SmallSidebarMenu = (props) => {
  const { open } = props
  const accountState = _.get(open, 'account')
  console.log(props)
  return (
    <div>
      {accountState && <Card>
        <CardHeader
          style={{ paddingLeft: '9px' }}
          avatar={avatar}
        />
      </Card>}
      <Menu
        autoWidth={false}
        menuItemStyle={{ width: '58px' }}>
        <MenuItem
          leftIcon={<ActionDashboard />}
          anchorOrigin={{ horizontal:'right', vertical:'center' }}
          targetOrigin={{ horizontal:'left', vertical:'top' }}
          menuItems={[
            <Subheader>Actions</Subheader>,
            <MenuItem primaryText="Starred" leftIcon={<ActionDns />} />,
            <MenuItem primaryText="Sent Mail" leftIcon={<ActionDns />} />
          ]} />
        <MenuItem
          leftIcon={<ActionCardGiftcard />}
          anchorOrigin={{ horizontal:'right', vertical:'center' }}
          targetOrigin={{ horizontal:'left', vertical:'top' }}
          menuItems={[
            <Subheader>Actions</Subheader>,
            <MenuItem primaryText="Starred" leftIcon={<ActionDns />} />,
            <MenuItem primaryText="Sent Mail" leftIcon={<ActionDns />} />
          ]} />
        <MenuItem
          leftIcon={<ActionDns />}
          anchorOrigin={{ horizontal:'right', vertical:'center' }}
          targetOrigin={{ horizontal:'left', vertical:'top' }}
          menuItems={[
            <Subheader>Actions</Subheader>,
            <MenuItem primaryText="Starred" leftIcon={<ActionDns />} />,
            <MenuItem primaryText="Sent Mail" leftIcon={<ActionDns />} />
          ]} />
      </Menu>
    </div>
  )
}

SmallSidebarMenu.propTypes = {
  open: PropTypes.object
}

export default SmallSidebarMenu
