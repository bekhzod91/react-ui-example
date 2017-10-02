import React from 'react'
import { compose, pure, withState, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import withWidth from 'material-ui-next/utils/withWidth'
import { fade } from 'material-ui-next/styles/colorManipulator'
import { withStyles } from 'material-ui-next/styles'
import IconButton from 'material-ui-next/IconButton'
import SearchIcon from 'material-ui-icons/Search'

const styles = theme => ({
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    '& $input': {
      transition: theme.transitions.create('width'),
      width: 200,
      '&:focus': {
        width: 250,
      },
    },
  },
  search: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 9}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    color: theme.table.headerTextColor,
    margin: 0, // Reset for Safari
    '&:focus': {
      outline: 0,
      width: '250px !important'
    },
  },
})

function AppSearch (props) {
  const { classes, search, onChange, onKeyPress, onSubmit } = props

  return (
    <div className={classes.wrapper}>
      <div className={classes.search}>
        <IconButton onClick={() => onSubmit(search)}>
          <SearchIcon style={{ color: '#fff' }} />
        </IconButton>
      </div>
      <input value={search} onChange={onChange} onKeyPress={onKeyPress} className={classes.input} />
    </div>
  )
}

AppSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired
}

export default compose(
  withState('search', 'setSearch', ''),
  withHandlers({
    onChange: ({ setSearch }) => (event) => {
      console.log(event.target.value)
      setSearch(event.target.value)
    },
    onKeyPress: ({ search, onSubmit }) => (event) => {
      if (event.key === 'Enter') {
        onSubmit(search)
      }
    }
  }),
  withStyles(styles, {
    name: 'AppSearch',
  }),
  withWidth(),
  pure,
)(AppSearch)
