import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 8,
    borderTop: '2px solid #e3ecf7'
  },
  raised: {
    marginLeft: 14,
    backgroundColor: theme.common.button.success.backgroundColor,
    color: theme.common.button.success.text,
    transition: '0.5s',
    '&:hover': {
      backgroundColor: theme.common.button.success.hover.backgroundColor
    }
  }
})

const TableEditActions = ({ classes, onClose }) => {
  return (
    <div className={classes.actions}>
      <Button onClick={onClose} variant="raised">
        Cancel
      </Button>
      <Button
        type="submit"
        variant="raised"
        classes={{ raised: classes.raised }}>
        Save
      </Button>
    </div>
  )
}

TableEditActions.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(TableEditActions)
