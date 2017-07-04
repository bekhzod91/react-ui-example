import React from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'
import IconButton from 'material-ui/IconButton'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import TextField from '../SimpleFields/TextField'

const PasswordViewField = ({ visibility, setVisibility, ...props }) => {
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        type={visibility ? 'text' : 'password'}
        {...props}
      />
      <IconButton
        style={{ position: 'absolute', top: '25px', right: '-10px' }}
        onTouchTap={() => setVisibility(!visibility)}>
        {visibility ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </div>
  )
}

PasswordViewField.propTypes = {
  visibility: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired
}

export default withState('visibility', 'setVisibility', false)(PasswordViewField)
