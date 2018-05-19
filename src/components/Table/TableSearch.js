import React from 'react'
import classNames from 'classnames'
import { compose, pure, withState, withHandlers, componentFromStream } from 'recompose'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
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
    },
    color: theme.table.headerTextColor
  }
})

const TableSearch = componentFromStream(props$ => {
  return props$.combineLatest(({ classes, ...props }) => (
    <div className={classNames(classes.root)}>
      <div className={classes.search}>
        <IconButton onClick={() => props.onSubmit(props.search)}>
          <SearchIcon />
        </IconButton>
      </div>
      <input
        value={props.search}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        className={classes.input}
      />
    </div>
  ))
})

TableSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired
}

export default compose(
  withRouter,
  withState('search', 'setSearch', ({ history }) => getSearchFromRoute(history)),
  withHandlers({
    onSubmit: ({ history }) => (value) => {
      const fullPath = getFullPathFromLocation(history.location)

      console.log(appendParamsToUrl({ page: 1, search: value }, fullPath))
      history.push(appendParamsToUrl({ page: 1, search: value }, fullPath))
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
