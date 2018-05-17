import React from 'react'
import classNames from 'classnames'
import { compose, pure, withState, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import { fade } from '@material-ui/core/styles/colorManipulator'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { getFullPathFromLocation } from '../../helpers/get'
import { appendParamsToUrl } from '../../helpers/urls'
import { getSearchFromRoute } from './helper'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
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
    margin: 0, // Reset for Safari
    '&:focus': {
      outline: 0,
      width: '250px !important'
    }
  }
})

function TableSearch (props) {
  const { classes, search, onChange, onKeyPress, onSubmit, className } = props

  return (
    <div className={classNames(classes.root, {}, className)}>
      <div className={classes.search}>
        <IconButton onClick={() => onSubmit(search)}>
          <SearchIcon />
        </IconButton>
      </div>
      <input value={search} onChange={onChange} onKeyPress={onKeyPress} className={classes.input} />
    </div>
  )
}

TableSearch.propTypes = {
  className: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  search: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired
}

export default compose(
  withState('search', 'setSearch', ({ route }) => getSearchFromRoute(route)),
  withHandlers({
    onSubmit: ({ route }) => (value) => {
      const { push, location } = route
      const fullPath = getFullPathFromLocation(location)

      return push(appendParamsToUrl({ page: 1, search: value }, fullPath))
    }
  }),
  withHandlers({
    onChange: ({ setSearch }) => (event) => {
      setSearch(event.target.value)
    },
    onKeyPress: ({ search, onSubmit }) => (event) => {
      if (event.key === 'Enter') {
        onSubmit(search)
      }
    }
  }),
  withStyles(styles),
  pure,
)(TableSearch)
