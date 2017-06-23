import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import SidebarIcon from './SidebarIcon'

const SidebarButton = (props) => {
  const { position, positionChange } = props
  const onTouchTap = _.get(position, 'open')
    ? () => positionChange({ ...position, open: false }) : () => positionChange({ ...position, open: true })
  return (
    <IconButton onTouchTap={onTouchTap}>
      <SidebarIcon />
    </IconButton>
  )
}

SidebarButton.propTypes = {
  position: PropTypes.object,
  positionChange: PropTypes.func.isRequired
}

export default SidebarButton
