import React from 'react'
import PropTypes from 'prop-types'
import MUICheckbox from 'material-ui/Checkbox'

const checkboxStyle = {
  textAlign: 'left',
  marginBottom: '10px',
  marginTop: '10px'
}

const Checkbox = ({ input, meta, label, ...defaultProps }) => (
  <MUICheckbox
    label={label}
    style={checkboxStyle}
    checked={Boolean(input.value)}
    onCheck={input.onChange}
    {...defaultProps}
  />
)

Checkbox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
}

export default Checkbox
