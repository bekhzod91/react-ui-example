import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import SidebarButton from './SidebarButton'
import AccountButton from './AccountButton'
import * as STYLE from '../styles/style'
import logo from './assets/logo-icon.png'

const styles = {
  logo: {
    paddingLeft: '10px'
  },
  title: {
    paddingLeft: '15px !important',
    color: `${STYLE.SECOND_TEXT_COLOR} !important`
  },
  buttons: {
    color: 'white',
    position: 'absolute',
    display: 'flex',
    transform: props => _.get(props, ['open', 'open']) ? 'translate(250px)' : 'translate(50px)'
  }
}

const LeftAppBar = (props) => {
  const { classes, open, positionChange } = props
  const toolbarState = _.get(open, 'open')
  return (
    <ToolbarGroup firstChild={true}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>
      {toolbarState && <ToolbarTitle text="Company Name" className={classes.title} />}
      <div className={classes.buttons}>
        <SidebarButton position={open} positionChange={positionChange} />
        <AccountButton position={open} positionChange={positionChange} />
      </div>
    </ToolbarGroup>
  )
}

LeftAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.object,
  positionChange: PropTypes.func.isRequired
}

export default injectSheet(styles)(LeftAppBar)
