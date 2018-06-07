import React from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import TextField from './TextField'

const enhance = withState('visibility', 'setVisibility', false)

const PasswordViewField = ({ visibility, setVisibility, ...props }) => {
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        {...props}
        type={visibility ? 'text' : 'password'}
      />
      <IconButton
        onMouseDown={() => setVisibility(true)}
        onMouseUp={() => setVisibility(false)}
        onMouseLeave={() => setVisibility(false)}

        onKeyPress={(event) => (event.key === 'Enter' || event.key === ' ') && setVisibility(true)}
        onKeyUp={() => setVisibility(false)}

        onTouchStart={() => setVisibility(true)}
        onTouchEnd={() => setVisibility(false)}
        style={{ position: 'absolute', top: '25px', right: '-10px' }}>
        {visibility ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </div>
  )
}

PasswordViewField.propTypes = {
  visibility: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired
}

export default enhance(PasswordViewField)
