import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import logoImg from '../routes/Auth/components/logo.png'

const styles = {
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
  }
}

export const Logo = ({ classes }) => (
  <div className={classes.logo}>
    <img src={logoImg} className={classes.logoImg} alt="logo" />
  </div>
)

Logo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default injectSheet(styles)(Logo)
