import React from 'react'
import MUIRaisedButton from 'material-ui/RaisedButton'

const RaisedButton = (props) => {
  return (
    <MUIRaisedButton
      buttonStyle={{ height: '44px', lineHeight: '44px' }}
      overlayStyle={{ height: '44px', lineHeight: '44px' }}
      {...props}
    />
  )
}

export default RaisedButton
