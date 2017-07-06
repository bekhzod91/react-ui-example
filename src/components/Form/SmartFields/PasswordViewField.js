import React from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'
import IconButton from 'material-ui/IconButton'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import Hammer from 'react-hammerjs'
import TextField from '../SimpleFields/TextField'

const PasswordViewField = ({ visibility, setVisibility, ...props }) => {
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        {...props}
        type={visibility ? 'text' : 'password'}
      />
      <Hammer
        onPress={() => setVisibility(true)}
        onPressUp={() => setVisibility(false)}
        onMouseLeave={() => setVisibility(false)}
        onTouchEnd={() => setVisibility(false)}>
        <IconButton
          style={{ position: 'absolute', top: '25px', right: '-10px' }}>
          {visibility ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </Hammer>
    </div>
  )
}

PasswordViewField.propTypes = {
  visibility: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired
}

export default withState('visibility', 'setVisibility', false)(PasswordViewField)
