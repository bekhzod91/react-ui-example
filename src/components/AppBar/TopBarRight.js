import React from 'react'
import { ToolbarGroup } from 'material-ui/Toolbar'
import AvPlaylistAdd from 'material-ui/svg-icons/av/playlist-add'

const RightAppBar = () => {
  return (
    <ToolbarGroup>
      <AvPlaylistAdd style={{ color: 'white' }} />
    </ToolbarGroup>
  )
}

export default RightAppBar
