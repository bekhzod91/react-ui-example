import React from 'react'
import { ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import AvPlaylistAddIcon from 'material-ui/svg-icons/av/playlist-add'
import LockOutlineIcon from 'material-ui/svg-icons/action/lock-outline'
import * as STYLE from '../../styles/style'

const styles = {
  icon: {
    color: STYLE.ICON_COLOR
  }
}

const RightAppBar = () => {
  return (
    <ToolbarGroup>
      <IconButton iconStyle={styles.icon}>
        <LockOutlineIcon />
      </IconButton>

      <IconButton iconStyle={styles.icon} >
        <AvPlaylistAddIcon />
      </IconButton>
    </ToolbarGroup>
  )
}

export default RightAppBar
