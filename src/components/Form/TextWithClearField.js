import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Fade from '@material-ui/core/Fade'
import withStyles from '@material-ui/core/styles/withStyles'
import ClearIcon from '@material-ui/icons/Clear'
import TextField from './TextField'

const styles = theme => ({
  root: {
    position: 'relative'
  },
  icon: {
    top: 28,
    right: 0,
    width: 28,
    height: 28,
    zIndex: 10,
    position: 'absolute',
  },
  hide: {
    visibility: 'hidden'
  }
})

const TextWithClearField = ({ classes, ...props }) => (
  <div className={classes.root}>
    <TextField {...props} />

    <Fade in={Boolean(props.input.value)}>
      <IconButton
        className={classes.icon}
        onClick={() => props.input.onChange(null)}>
        <ClearIcon />
      </IconButton>
    </Fade>
  </div>
)

TextWithClearField.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  helperText: PropTypes.string
}

export default withStyles(styles)(TextWithClearField)
