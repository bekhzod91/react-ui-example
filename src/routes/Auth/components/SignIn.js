import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import * as STYLE from '../../../styles/style'
import FaceBookIcon from '../../../components/FaceBookIcon'
import GooglePlusIcon from '../../../components/GooglePlusIcon'
import TwitterIcon from '../../../components/TwitterIcon'
import RaisedButton from '../../../components/RaisedButton'
import logoImg from './logo.png'

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

  logo: {
    width: 115,
    height: 115,
    borderRadius: '100%',
    zIndex: '10',
    background: '#fff',
    margin: '0 auto'
  },

  logoImg: {
    padding: '27px 15px',
    maxWidth: '100%'
  },

  logoTitle: {
    textAlign: 'center',
    fontSize: 20,
    margin: '10px auto',
    textTransform: 'uppercase'
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

  loginAction: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: '15px 0 0px',
  },

  signInButton: {
    marginTop: '40px',
    marginBottom: '10px'
  },

  footer: {
    padding: 15,
    '& p': {
      textAlign: 'center'
    }
  }
}

export const SignIn = ({ classes, onSubmit }) => (
  <div className={classes.wrapper}>
    <div className={classes.content}>
      <div className={classes.logo}>
        <img src={logoImg} className={classes.logoImg} alt="logo" />
      </div>

      <h1 className={classes.logoTitle}>Sign In to your account</h1>

      <div>
        <form onSubmit={onSubmit}>
          <TextField
            hintText="Email"
            floatingLabelText="Enter Email"
            fullWidth={true}
          /><br />

          <TextField
            hintText="Password"
            floatingLabelText="Enter Password"
            type="password"
            fullWidth={true}
          /><br />

          <div className={classes.loginAction}>
            <Checkbox
              label="Remember me"
              labelStyle={{ fontWeight: 400 }}
              style={{ maxWidth: '200px' }}
            />
            <a href="javascript:void(0)">Forgot Password?</a>
          </div>

          <RaisedButton
            id="signInButton"
            type="submit"
            className={classes.signInButton}
            label="Sign In"
            primary={true}
            fullWidth={true}
          />
        </form>

        <div className={classes.loginOption}>
          <span>OR</span>
          <hr />
        </div>

        <div>
          <RaisedButton
            label="Sign In with FaceBook"
            labelColor={STYLE.SECOND_TEXT_COLOR}
            icon={<FaceBookIcon />}
            fullWidth={true}
            backgroundColor={STYLE.SOCIAL_FACEBOOK_COLOR}
            style={{ margin: '12px 0' }}
          />

          <RaisedButton
            label="Sign In with FaceBook"
            labelColor={STYLE.SECOND_TEXT_COLOR}
            icon={<GooglePlusIcon />}
            fullWidth={true}
            backgroundColor={STYLE.SOCIAL_GOOGLEPLUS_COLOR}
            style={{ margin: '12px 0' }}
          />

          <RaisedButton
            label="Sign In with Twitter"
            labelColor={STYLE.SECOND_TEXT_COLOR}
            icon={<TwitterIcon />}
            fullWidth={true}
            backgroundColor={STYLE.SOCIAL_TWITTER_COLOR}
            style={{ margin: '12px 0' }}
          />
        </div>

        <div className={classes.footer}>
          <p>Don't have an account? <a href="/sign-up">Create an account</a></p>
        </div>
      </div>
    </div>
  </div>
)

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default injectSheet(styles)(SignIn)
