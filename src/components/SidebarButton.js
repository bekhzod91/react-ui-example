import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import IconButton from 'material-ui/IconButton'
import SidebarIcon from './SidebarIcon'

const styles = {
  sidebarButton: {
    transform: props => _.get(props, ['position', 'open']) ? 'scaleX(1)' : 'scaleX(-1)'
  }
}

const SidebarButton = (props) => {
  const { classes, position, positionChange } = props
  const onTouchTap = _.get(position, 'open')
    ? () => positionChange({ ...position, open: false }) : () => positionChange({ ...position, open: true })

  return (
    <IconButton onTouchTap={onTouchTap} className={classes.sidebarButton}>
      <SidebarIcon />
    </IconButton>
  )
}

SidebarButton.propTypes = {
  classes: PropTypes.object.isRequired,
  position: PropTypes.object,
  positionChange: PropTypes.func.isRequired
}

export default injectSheet(styles)(SidebarButton)
