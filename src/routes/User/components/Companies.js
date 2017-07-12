import _ from 'lodash'
import sprintf from 'sprintf'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { browserHistory } from 'react-router'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import CircularProgress from 'material-ui/CircularProgress'
import * as ROUTE from '../../../constants/routes'
import { fromNow } from '../../../helpers/dateFormat'
import * as STYLE from '../../../styles/style'
import AuthLayout from '../../../components/AuthLayout'

const styles = {
  loader: {
    display: 'flex',
    justifyContent: 'center',
    margin: '80px 0 '
  },

  companyLogo: {
    left: '10px'
  },

  goBack: {
    marginTop: '20px !important',
    fontWeight: '700 !important',
  },

  loginOption: {
    textAlign: 'center',
    margin: '25px auto 0',
    minHeight: 15,
    position: 'relative',

    '& span': {
      position: 'absolute',
      top: -9,
      background: '#fff',
      padding: '0 15px',
      margin: 'auto',
      left: '42%'
    }
  },
}

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
        color={STYLE.PRIMARY_50_COLOR}
        backgroundColor={STYLE.PRIMARY_COLOR}
        size={40}
        style={styles.companyLogo}
      >{_.get(name, 0)}</Avatar>
    )

    return (
      <ListItem
        key={index}
        insetChildren={true}
        primaryText={name}
        secondaryText={activityInfo}
        leftAvatar={logo}
        onTouchTap={() => browserHistory.push(companyPage)}
        rightIcon={<KeyboardArrowRight />}
      />
    )
  })

  const content = loading ? (
    <div className={classes.loader}>
      <CircularProgress size={80} thickness={5} />
    </div>
  ) : (
    <List>
      {companies}

      <ListItem
        insetChildren={true}
        className={classes.goBack}
        primaryText="Go back"
        onTouchTap={() => browserHistory.push(ROUTE.SIGN_IN_URL)}
        leftIcon={<KeyboardArrowLeft />}
      />
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

export default injectSheet(styles)(Companies)
