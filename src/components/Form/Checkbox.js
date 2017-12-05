import React from 'react'
import PropTypes from 'prop-types'
import MUICheckbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import withStyles from 'material-ui/styles/withStyles'

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkbox: {
    textAlign: 'left'
  }
}

const Checkbox = ({ classes, input, meta, label, ...defaultProps }) => (
  <FormControlLabel
    control={
      <MUICheckbox
        className={classes.checkbox}
        checked={Boolean(input.value)}
        onChange={input.onChange}
        {...defaultProps}
      />
    }
    label={label} />
)

Checkbox.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
}

export default withStyles(styles)(Checkbox)
