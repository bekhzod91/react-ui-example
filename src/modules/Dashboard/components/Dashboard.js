import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'
import * as ROUTE from '../../../constants/routes'
import Widget from './Widget'
import Contacts from './Contacts'
import SimpleChart from './ChartJs'
import More from '../../../components/More'
import Menu, { MenuItem } from 'material-ui/Menu'

const Dashboard = ({ appBar }) => {
  const widgetActions = (
    <More>
      <Menu>
        <MenuItem>
          Popup
        </MenuItem>
        <MenuItem>
          Download CSV format
        </MenuItem>
      </Menu>
    </More>
  )
  return (
    <AppBar activeMenuName={ROUTE.DASHBOARD} {...appBar}>
      <Widget
        onChangeTab={(value) => console.log(value)}
        widgetInfo={{ title: 'Google Inc',
          subtitle: 'nasdaq: goog',
          testNumber: 540.48,
          bouncingNumber: '2.29 (2.05%)' }}
        loading={false}
        actions={widgetActions}
        tabs={['day', 'week', 'month', 'year']}>
        <SimpleChart />
      </Widget>
      <Contacts
        alt={'User name'}
        list={[
          { name: 'Bekhzod', email: 'blabla@gmail.com' },
          { name: 'Abduvali', email: 'da@gmail.com' }
        ]}
        loading={false}
      />
    </AppBar>
  )
}

Dashboard.propTypes = {
  appBar: PropTypes.object.isRequired
}

export default Dashboard
