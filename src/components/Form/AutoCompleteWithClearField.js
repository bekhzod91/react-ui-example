import classNames from 'classnames'
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import withStyles from '@material-ui/core/styles/withStyles'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import AutoCompleteField from './AutoCompleteField'
import TextField from './TextField'

const styles = {
  hide: {
    visibility: 'hidden'
  }
}

const renderInputComponent = (inputProps) => {
  const {
    classes,
    autoFocus,
    value,
    label,
    margin,
    fullWidth,
    ref,
    loading,
    ...other
  } = inputProps

  const onClick = () => {
    inputProps.input.onChange(null)
    other.onChange({ target: { value: '' } })
  }

  return (
    <div>
      <TextField
        classes={{ input: classes.input }}
        label={label}
        autoFocus={autoFocus}
        value={value}
        inputRef={ref}
        margin={margin}
        fullWidth={fullWidth}
        {...other}
      />

      <Fade
        in={loading}
        className={classNames(classes.icon, { [classes.hide]: !loading })}>
        <CircularProgress size={28} />
      </Fade>

      <Fade
        in={Boolean(!loading && value)}
        className={classNames(classes.icon, { [classes.hide]: !(!loading && value) })}>
        <IconButton onClick={onClick}>
          <ClearIcon />
        </IconButton>
      </Fade>

      <Fade
        in={Boolean(!loading && !value)}
        className={classNames(classes.icon, { [classes.hide]: !(!loading && !value) })}>
        <div>
          <SearchIcon />
        </div>
      </Fade>
    </div>
  )
}

const AutoCompleteWithClearField = ({ ...props }) => {
  return (
    <AutoCompleteField
      renderInputComponent={renderInputComponent}
      {...props}
    />
  )
}

export default withStyles(styles)(AutoCompleteWithClearField)
