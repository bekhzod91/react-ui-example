import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'
import * as ROUTE from '../../../constants/routes'
import Widget from './Widget'
import ContactsWidget from './ContactsWidget'
import SimpleChart from './ChartJs'
import More from '../../../components/More'
import Menu, { MenuItem } from 'material-ui/Menu'
import Grid from 'material-ui/Grid'

const SPACE_BETWEEN_WIDGETS = 16

const Dashboard = ({ appBar, classes }) => {
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
      <Grid container={true} spacing={SPACE_BETWEEN_WIDGETS}>
        <Grid item={true} sm={4}>
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
        </Grid>
        <Grid item={true} sm={4}>
          <ContactsWidget
            alt={'User name'}
            list={[
              { name: 'Bekhzod', email: 'blabla@gmail.com' },
              { name: 'Abduvali', email: 'da@gmail.com' }
            ]}
            loading={false}
          />
        </Grid>
      </Grid>
    </AppBar>
  )
}

Dashboard.propTypes = {
  appBar: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default Dashboard
