import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import SvgIcon from 'material-ui/SvgIcon'
import * as STYLE from '../../styles/style'

const styles = {
  accountIcon: {
    color: `${STYLE.SECOND_TEXT_COLOR} !important`
  }
}

const AccountIcon = (props) => {
  const { classes } = props
  return (
    <SvgIcon className={classes.accountIcon}>
      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,
        12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14
        20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
    </SvgIcon>
  )
}

AccountIcon.propTypes = {
  classes: PropTypes.object.isRequired
}

export default injectSheet(styles)(AccountIcon)
