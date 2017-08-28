import React from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'
import Hammer from 'react-hammerjs'
import IconButton from 'material-ui-next/IconButton'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import TextFieldNext from '../SimpleFields/TextFieldNext'

const PasswordViewField = ({ visibility, setVisibility, ...props }) => {
  return (
    <div style={{ position: 'relative' }}>
      <TextFieldNext
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
