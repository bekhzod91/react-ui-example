import React from 'react'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'

const TextField = ({
  input, meta, disabled, fullWidth,
  helperText, label, inputProps, margin, ...props
}) => {
  return (
    <FormControl
      margin={margin}
      disabled={disabled}
      fullWidth={fullWidth}
      error={Boolean(meta.error)}>
      <InputLabel>{label}</InputLabel>
      <Input {...input} {...inputProps} {...props} />
      <FormHelperText>{meta.error || helperText}</FormHelperText>
    </FormControl>
  )
}

TextField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  margin: PropTypes.string,
  inputProps: PropTypes.object,
}

export default TextField
