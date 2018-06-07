import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import SvgIcon from '@material-ui/core/SvgIcon'

const styles = theme => ({
  icon: {
    color: `${theme.palette.secondary[4]} !important`
  }
})

const enhance = withStyles(styles)

const AccountIcon = (props) => {
  const { classes } = props
  return (
    <SvgIcon className={classes.icon}>
      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,
        12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14
        20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
    </SvgIcon>
  )
}

AccountIcon.propTypes = {
  classes: PropTypes.object.isRequired
}

export default enhance(AccountIcon)
