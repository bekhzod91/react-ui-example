import React from 'react'
import PropTypes from 'prop-types'

const Render = ({ children, render, ...props }) => {
  if (render) {
    return React.cloneElement(children, props)
  }

  return null
}

Render.propTypes = {
  children: PropTypes.node.isRequired,
  render: PropTypes.bool.isRequired,
}

export default Render
