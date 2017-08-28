import React from 'react'
import withStyles from 'material-ui-next/styles/withStyles'
import PropTypes from 'prop-types'

const styles = {
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
  }
}

const LineText = ({ classes, text }) => (
  <div className={classes.loginOption}>
    <span>{text}</span>
    <hr />
  </div>
)

LineText.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
}

export default withStyles(styles)(LineText)
