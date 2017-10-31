import React from 'react'
import { ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui-next/IconButton'
import PlaylistAddIcon from 'material-ui-icons/PlaylistAdd'
import LockOutlineIcon from 'material-ui-icons/LockOutline'
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
        <PlaylistAddIcon />
      </IconButton>
    </ToolbarGroup>
  )
}

export default RightAppBar
