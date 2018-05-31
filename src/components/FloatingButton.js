import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

const FloatingButton = ({ style, action, icon }) => {
  return (
    <Button
      onClick={action}
      variant="fab"
      color="secondary"
      aria-label="add"
      style={{
        position: 'fixed',
        right: '30px',
        bottom: '30px',
        ...style

      }}>
      {icon}
    </Button>
  )
}

FloatingButton.defaultProps = {
  icon: <AddIcon />
}

FloatingButton.propTypes = {
  style: PropTypes.object,
  icon: PropTypes.node.isRequired,
  action: PropTypes.func.isRequired
}

export default FloatingButton
