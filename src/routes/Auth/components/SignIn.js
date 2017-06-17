import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import LinearProgress from 'material-ui/LinearProgress'
import SignInForm from '../components/SignInForm'
import SignInSocialButtons from '../components/SignInSocialButtons'
import logoImg from './logo.png'

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

  footer: {
    padding: 15,
    '& p': {
      textAlign: 'center'
    }
  }
}

export const SignIn = ({ classes, loading, onSubmit, handleSocialSignIn }) => (
  <div className={classes.wrapper}>
    <div className={classes.content}>
      <div className={classes.loader}>
        {loading && <LinearProgress mode="indeterminate" style={{ borderRadius: 0 }} />}
      </div>

      <div className={classes.logo}>
        <img src={logoImg} className={classes.logoImg} alt="logo" />
      </div>

      <h1 className={classes.logoTitle}>Sign In to your account</h1>

      <div>
        <SignInForm onSubmit={onSubmit} />

        <div className={classes.loginOption}>
          <span>OR</span>
          <hr />
        </div>

        <SignInSocialButtons handleSocialSignIn={handleSocialSignIn} />

        <div className={classes.footer}>
          <p>Don't have an account? <a href="/sign-up">Create an account</a></p>
        </div>
      </div>
    </div>
  </div>
)

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSocialSignIn: PropTypes.shape({
    handleFacebookSignIn: PropTypes.func.isRequired,
    handleGooglePlusSignIn: PropTypes.func.isRequired,
    handleTwitterSignIn: PropTypes.func.isRequired,
  })
}

export default injectSheet(styles)(SignIn)
