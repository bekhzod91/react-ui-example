import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import SvgIcon from 'material-ui-next/SvgIcon'
import * as STYLE from '../../styles/style'

const styles = {
  sidebarIcon: {
    color: `${STYLE.SECOND_TEXT_COLOR} !important`
  }
}

const SidebarIcon = (props) => {
  const { classes } = props
  return (
    <SvgIcon className={classes.sidebarIcon}>
      <path d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z" />
    </SvgIcon>
  )
}

SidebarIcon.propTypes = {
  classes: PropTypes.object.isRequired
}

export default injectSheet(styles)(SidebarIcon)
