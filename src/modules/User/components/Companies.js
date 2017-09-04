import _ from 'lodash'
import sprintf from 'sprintf'
import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import Avatar from 'material-ui-next/Avatar'
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui-next/List'
import Divider from 'material-ui-next/Divider'
import CircularProgress from 'material-ui-next/Progress/CircularProgress'
import withStyles from 'material-ui-next/styles/withStyles'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import * as ROUTE from '../../../constants/routes'
import { fromNow } from '../../../helpers/dateFormat'
import AuthLayout from '../../../components/Layouts/AuthLayout'

const styles = theme => ({
  avatarWithOutLogo: {
    color: theme.palette.primary['A100'],
    backgroundColor: theme.palette.primary['A700']
  },

  loader: {
    display: 'flex',
    justifyContent: 'center',
    margin: '80px 0 '
  },

  companyItem: {
    padding: '15px 10px !important'
  },

  companyLogo: {
    left: '10px'
  },

  goBack: {
    marginTop: '20px !important',
    fontWeight: '700 !important',
    '& h3': {
      fontSize: '14px'
    }
  }
})

const Companies = ({ classes, loading, list }) => {
  const companies = _.map(list, (item, index) => {
    const id = _.get(item, 'id')
    const name = _.get(item, 'name')
    const logoUrl = _.get(item, ['logo', 'uri'])
    const lastActivityDate = _.get(item, 'lastActivity')
    const activityInfo = lastActivityDate ? (
      `Last activity ${fromNow(lastActivityDate, 'D MMM YYYY')}`
    ) : 'Never been activity'
    const companyPage = sprintf(ROUTE.COMPANY_MY_PATH, id)

    const logo = logoUrl ? (
      <Avatar
        src={logoUrl}
        size={40}
        style={{ ...styles.companyLogo, backgroundColor: 'transparent' }}
      />
    ) : (
      <Avatar
        className={classes.avatarWithOutLogo}
        size={40}
        style={styles.companyLogo}
      >{_.get(name, 0)}</Avatar>
    )

    return (
      <div key={id}>
        <ListItem
          button={true}
          className={classes.companyItem}
          onTouchTap={() => browserHistory.push(companyPage)}>
          <ListItemAvatar>{logo}</ListItemAvatar>
          <ListItemText primary={name} secondary={activityInfo} />
          <KeyboardArrowRight />
        </ListItem>
        <Divider light={true} />
      </div>
    )
  })

  const content = loading ? (
    <div className={classes.loader}>
      <CircularProgress size={80} />
    </div>
  ) : (
    <List>
      <Divider light={true} />
      {companies}
      <ListItem
        button={true}
        className={classes.goBack}
        onTouchTap={() => browserHistory.push(ROUTE.SIGN_IN_URL)}>
        <KeyboardArrowLeft />
        <ListItemText primary="Go back" />
      </ListItem>
    </List>
  )

  return (
    <AuthLayout
      title="FOR CONTINUE SING-IN SELECT COMPANY"
      loading={loading}>
      <div>
        {content}
      </div>
    </AuthLayout>
  )
}

Companies.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Companies)
