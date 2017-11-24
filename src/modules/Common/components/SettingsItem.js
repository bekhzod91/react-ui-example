import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui/styles/withStyles'
import ButtonBase from 'material-ui/ButtonBase'

const styles = theme => ({
  root: {
    boxShadow: theme.shadows[1],
    maxWidth: 300,
    '& button': {
      textAlign: 'left'
    }
  },
  title: {
    fontWeight: '600',
    margin: '10px 0'
  },
  p: {
    margin: '10px 0'
  }
})

const SettingsItem = ({ classes, title, icon, description }) => {
  return (
    <div className={classes.root}>
      <ButtonBase focusRipple={true}>
        {icon}
        <div className={classes.description}>
          <h4 className={classes.title}>{title}</h4>
          <p>{description}</p>
        </div>
      </ButtonBase>
    </div>
  )
}

SettingsItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired
}

export default withStyles(styles)(SettingsItem)
