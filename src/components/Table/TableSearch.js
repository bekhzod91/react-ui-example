import { compose, assocPath, path, prop, defaultTo } from 'ramda'
import React from 'react'
import classNames from 'classnames'
import { pure, componentFromStream, createEventHandler } from 'recompose'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { fade } from '@material-ui/core/styles/colorManipulator'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { addParamsRoute } from '../../helpers/route'
import { parseParams } from '../../helpers/urls'

export const searchFormHistory = compose(
  defaultTo(''),
  prop('search'),
  parseParams,
  path(['location', 'search'])
)

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
  const { stream: onChange$, handler: onChange } = createEventHandler()
  const { stream: onKeyPress$, handler: onKeyPress } = createEventHandler()
  const { stream: onSubmit$, handler: onSubmit } = createEventHandler()

  props$
    .first()
    .subscribe(({ history }) => {
      const search = searchFormHistory(history)
      const event = assocPath(['target', 'value'], search, {})
      onChange(event)
    })

  const search$ = onChange$
    .startWith('')
    .map(compose(defaultTo(''), path(['target', 'value'])))

  onSubmit$
    .withLatestFrom(props$)
    .subscribe(([ search, { history } ]) => {
      addParamsRoute({ search }, history)
    })

  onKeyPress$
    .subscribe((event) => {
      if (event.key === 'Enter') {
        onSubmit(event.target.value)
      }
    })

  return props$.combineLatest(search$, ({ classes, ...props }, search) => (
    <div className={classNames(classes.root)}>
      <div className={classes.search}>
        <IconButton onClick={() => onSubmit(search)}>
          <SearchIcon />
        </IconButton>
      </div>
      <input
        value={search}
        onChange={onChange}
        onKeyPress={onKeyPress}
        className={classes.input}
      />
    </div>
  ))
})

TableSearch.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withRouter,
  withStyles(styles),
  pure,
)(TableSearch)
