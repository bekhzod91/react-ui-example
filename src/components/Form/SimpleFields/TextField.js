import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import MUITextField from 'material-ui/TextField'
import withStyles from 'material-ui/styles/withStyles'

const styles = theme => ({
  input: {
    '&:before': {
      height: '2px'
    },
    '&:hover:before': {
      height: '2px !important',
      backgroundColor: `${theme.palette.input.bottomLine} !important`
    }
  },
  inputError: {
    '&:before': {
      height: '2px',
      backgroundColor: `${theme.palette.error['A200']}`
    },
    '&:hover:before': {
      height: '2px !important',
      backgroundColor: `${theme.palette.error['A200']} !important`
    }
  },
  helperTextError: {
    textAlign: 'left',
    color: theme.palette.error['A200']
  }
})

const TextField = ({ classes, input, meta: { error }, placeholder, ...defaultProps, helperText }) => (
  <MUITextField
    InputClassName={classNames({
      [classes.input]: !error,
      [classes.inputError]: error
    })}
    InputProps={{ placeholder: placeholder }}
    helperText={error || helperText}
    helperTextClassName={classNames({
      [classes.helperTextError]: error
    })}
    {...input}
    {...defaultProps}
  />
)

TextField.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  helperText: PropTypes.string
}

export default withStyles(styles)(TextField)
