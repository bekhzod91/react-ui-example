import { map, prop, path } from 'ramda'
import sprintf from 'sprintf'
import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/Progress/CircularProgress'
import withStyles from 'material-ui/styles/withStyles'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import AuthLayout from '../../../components/Layouts/AuthLayout'
import { fromNow } from '../../../helpers/dateFormat'
import * as ROUTES from '../../../constants/routes'

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

const Companies = ({ classes, push, loading, list }) => {
  const companies = map((item, index) => {
    const id = prop('id', item)
    const name = prop('name', item)
    const logoUrl = path(['logo', 'uri'], item)
    const lastActivityDate = prop('lastActivity', item)
    const activityInfo = lastActivityDate ? (
      `Last activity ${fromNow(lastActivityDate, 'D MMM YYYY')}`
    ) : 'Never been activity'
    const companyPage = sprintf(ROUTES.DASHBOARD_PATH, id)

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
      >{prop(0, name)}</Avatar>
    )

    return (
      <div key={id}>
        <ListItem
          button={true}
          className={classes.companyItem}
          onClick={() => push(companyPage)}>
          <ListItemAvatar>{logo}</ListItemAvatar>
          <ListItemText primary={name} secondary={activityInfo} />
          <KeyboardArrowRight />
        </ListItem>
        <Divider light={true} />
      </div>
    )
  }, list)

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
        onClick={() => push(ROUTES.SIGN_IN_URL)}>
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
  push: PropTypes.func.isRequired,
}

export default withStyles(styles)(Companies)
