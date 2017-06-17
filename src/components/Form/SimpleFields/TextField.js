import React from 'react'
import PropTypes from 'prop-types'
import MUITextField from 'material-ui/TextField'
import * as STYLE from '../../../styles/style'

const errorStyle = {
  textAlign: 'left',
  color: STYLE.DANGER_COLOR
}

const TextField = ({ input, meta: { error }, ...defaultProps }) => {
  return (
    <MUITextField
      errorText={error}
      errorStyle={errorStyle}
      {...input}
      {...defaultProps}
    />
  )
}

TextField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
}

export default TextField
