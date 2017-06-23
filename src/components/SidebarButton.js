import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import SidebarIcon from './SidebarIcon'

const SidebarButton = (props) => {
  const { position, setState } = props
  const translate = _.get(position, 'open') ? 'translate(250px)' : 'translate(50px) scale(-1)'
  const onTouchTap = _.get(position, 'open')
    ? () => setState({ ...position, open: false }) : () => setState({ ...position, open: true })
  return (
    <IconButton
      onTouchTap={onTouchTap}
      style={{ transform: translate, position: 'absolute' }}>
      <SidebarIcon />
    </IconButton>
  )
}

SidebarButton.propTypes = {
  position: PropTypes.object,
  setState: PropTypes.func.isRequired
}

export default SidebarButton
