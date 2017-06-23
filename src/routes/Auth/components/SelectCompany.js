import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import CircularProgress from 'material-ui/CircularProgress'
import Logo from '../components/Logo'
import RaisedButton from '../../../components/RaisedButton'
import LogoImg from '../components/logo.png'

const styles = {
  wrapper: {
    position: 'relative',
    margin: '5% auto auto',
    width: '375px',
  },

  loader: {
    position: 'absolute',
    width: '100%',
    right: 0,
    opacity: props => props.loading ? 1 : 0,
    transition: 'opacity 0.5s ease-out'
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

  companyLogo: {
    left: '5px'
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

const SelectCompany = ({ loading, classes }) => {
  console.log(loading)
  const content = loading ? (
    <CircularProgress size={80} thickness={5} />
  ) : (
    <List>
      <ListItem
        insetChildren={true}
        primaryText="Janet Perkins Bennet"
        leftAvatar={
          <Avatar
            src={LogoImg}
            size={40}
            style={styles.companyLogo}
          />
        }
      />
      <ListItem
        insetChildren={true}
        primaryText="Peter Carlsson"
        leftAvatar={
          <Avatar
            src={LogoImg}
            size={40}
            style={styles.companyLogo}
          />
        }
      />
    </List>
  )

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Logo />

        <h1 className={classes.logoTitle}>Select your company</h1>

        {content}

        <div className={classes.loginOption}>
          <span>OR</span>
          <hr />
        </div>

        <RaisedButton
          type="submit"
          className={classes.signInButton}
          label="Sign Out"
          primary={true}
          fullWidth={true}
        />
      </div>
    </div>
  )
}

SelectCompany.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default injectSheet(styles)(SelectCompany)
