import React from 'react'
import PropTypes from 'prop-types'
import MUIButton from 'material-ui-next/Button'

const Button = ({ fullWidth, style, ...props }) => {
  return (
    <MUIButton
      style={{ width: fullWidth ? '100%' : 'auto', ...style }}
      {...props}
    />
  )
}

Button.defaultProps = {
  fullWidth: true,
  raised: true
}

Button.propTypes = {
  style: PropTypes.object,
  fullWidth: PropTypes.bool
}

export default Button
