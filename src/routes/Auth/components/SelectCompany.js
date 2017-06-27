import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import CircularProgress from 'material-ui/CircularProgress'
import Logo from '../components/Logo'
import * as STYLE from '../../../styles/style'

const styles = {
  wrapper: {
    position: 'relative',
    margin: '5% auto auto',
    width: '375px',
  },

  content: {
    overflow: 'hidden',
    background: '#fff',
    boxShadow: '0 5px 12px rgba(0,0,0,.2)',
    transition: 'all,.2s,ease-in-out',
    position: 'relative',
    width: 375,
    padding: '0 30px 30px',
    boxSizing: 'border-box'
  },

  logoTitle: {
    textAlign: 'center',
    fontSize: 20,
    margin: '10px auto',
    textTransform: 'uppercase'
  },

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

const SelectCompany = ({ classes, loading, list }) => {
  const companies = _.map(list, (item, index) => {
    const name = _.get(item, 'name')
    const logoUrl = _.get(item, ['logo', 'uri'])
    const lastActivity = _.get(item, 'lastActivity')
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
        secondaryText={lastActivity}
        leftAvatar={logo}
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
        leftIcon={<KeyboardArrowLeft />}
      />
    </List>
  )

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Logo />

        <h1 className={classes.logoTitle}>For continue Sing-In select company</h1>

        {content}
      </div>
    </div>
  )
}

SelectCompany.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default injectSheet(styles)(SelectCompany)
