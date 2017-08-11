import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Menu from 'material-ui/Menu'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import ActionDashboard from 'material-ui/svg-icons/action/dashboard'
import ActionCardGiftcard from 'material-ui/svg-icons/action/card-giftcard'
import Subheader from 'material-ui/Subheader'
import avatar from '../assets/photo.jpg'
import ActionDns from 'material-ui/svg-icons/action/dns'

const styles = {
  menuItemStyle: {
    width: '58px',
    borderRadius: '0px !important',
    padding: '0 0 8px 0',
  },
  subheader: {
    lineHeight: '33px',
    fontWeight: 700
  }
}

const SmallSidebarMenu = ({ open, classes }) => {
  const accountState = _.get(open, 'account')
  return (
    <div>
      {accountState && <Avatar src={avatar} style={{ margin: '10px 0 0 10px' }} />}
      <Menu
        autoWidth={false}
        menuItemStyle={styles.menuItemStyle}>
        <MenuItem
          leftIcon={<ActionDashboard />}
          anchorOrigin={{ horizontal:'right', vertical:'top' }}
          targetOrigin={{ horizontal:'left', vertical:'top' }}
          menuItems={[
            <Subheader style={styles.subheader}>Actions</Subheader>,
            <Divider />,
            <MenuItem primaryText="Starred" leftIcon={<ActionDns />} />,
            <MenuItem primaryText="Sent Mail" leftIcon={<ActionDns />} />
          ]} />
        <MenuItem
          leftIcon={<ActionCardGiftcard />}
          anchorOrigin={{ horizontal:'right', vertical:'top' }}
          targetOrigin={{ horizontal:'left', vertical:'top' }}
          menuItems={[
            <Subheader style={styles.subheader}>Actions</Subheader>,
            <Divider />,
            <MenuItem primaryText="Starred" leftIcon={<ActionDns />} />,
            <MenuItem primaryText="Sent Mail" leftIcon={<ActionDns />} />
          ]} />
        <MenuItem
          leftIcon={<ActionDns />}
          anchorOrigin={{ horizontal:'right', vertical:'top' }}
          targetOrigin={{ horizontal:'left', vertical:'top' }}
          menuItems={[
            <Subheader style={styles.subheader}>Actions</Subheader>,
            <Divider />,
            <MenuItem primaryText="Starred" leftIcon={<ActionDns />} />,
            <MenuItem primaryText="Sent Mail" leftIcon={<ActionDns />} />
          ]} />
      </Menu>
    </div>
  )
}

SmallSidebarMenu.propTypes = {
  open: PropTypes.object,
  classes: PropTypes.object.isRequired
}

export default injectSheet(styles)(SmallSidebarMenu)
