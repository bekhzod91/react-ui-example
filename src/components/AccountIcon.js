import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import SvgIcon from 'material-ui/SvgIcon'
import IconButton from 'material-ui/IconButton'
import * as STYLE from '../styles/style'

const styles = {
  accountIcon: {
    color: `${STYLE.SECOND_TEXT_COLOR} !important`
  }
}

const path = `M12,4A4,4 0 0,1 16,8A4,4 0 0,1 
12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 
20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z`

const AccoountIcon = (props) => {
  const { classes, onTouchTap, position } = props
  const translate = position ? 'translate(290px)' : 'translate(90px)'
  return (
    <IconButton onTouchTap={onTouchTap} style={{ transform: translate, position: 'absolute' }}>
      <SvgIcon className={classes.accountIcon}>
        <path d={path} />
      </SvgIcon>
    </IconButton>
  )
}

AccoountIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  onTouchTap: PropTypes.func.isRequired,
  position: PropTypes.bool
}

export default injectSheet(styles)(AccoountIcon)
