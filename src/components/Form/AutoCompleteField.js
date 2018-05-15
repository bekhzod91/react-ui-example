import { compose, prop, is, equals, curry } from 'ramda'
import { BehaviorSubject } from 'rxjs'
import React from 'react'
import { mapPropsStream, createEventHandler } from 'recompose'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import SearchIcon from 'material-ui-icons/Search'
import { axiosCancelRequest } from '../../helpers/cancel'
import TextField from './TextField'

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

      <Fade in={loading}>
        <CircularProgress className={classes.icon} size={28} />
      </Fade>

      <Fade in={!loading}>
        <div className={classes.icon}>
          <SearchIcon />
        </div>
      </Fade>
    </div>
  )
}

const renderSuggestionsContainer = (options) => {
  const { containerProps, children } = options

  return (
    <Paper {...containerProps} square={true}>
      {children}
    </Paper>
  )
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    left: 0,
    right: 0,
    zIndex: 1,
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
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
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
})

const AutoCompleteField = ({ classes, label, placeholder, margin, fullWidth, input, meta, ...props }) => {
  return (
    <Autosuggest
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderInputComponent={props.renderInputComponent}
      suggestions={props.state.suggestions}
      onSuggestionsFetchRequested={props.onFetchRequested}
      onSuggestionsClearRequested={props.onClearRequested}
      renderSuggestionsContainer={renderSuggestionsContainer}
      getSuggestionValue={curry((onChange, suggestion) =>
        props.getSuggestionValue(onChange, suggestion))(input.onChange)
      }
      renderSuggestion={props.renderSuggestion}
      shouldRenderSuggestions={props.shouldRenderSuggestions}
      inputProps={{
        classes,
        label,
        margin,
        placeholder,
        fullWidth,
        value: props.state.value,
        loading: props.state.loading,
        input,
        meta,
        onChange: (event, value) => props.onTyping(value)
      }}
    />
  )
}

AutoCompleteField.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  margin: PropTypes.string,
  fullWidth: PropTypes.bool,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  onTyping: PropTypes.func.isRequired,
  onFetchRequested: PropTypes.func.isRequired,
  onClearRequested: PropTypes.func.isRequired,
  shouldRenderSuggestions: PropTypes.func.isRequired,
  renderInputComponent: PropTypes.func.isRequired,
  getSuggestionByKeyword: PropTypes.func.isRequired,
  getSuggestionValue: PropTypes.func.isRequired,
  renderSuggestion: PropTypes.func.isRequired,
  getById: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
  getId: PropTypes.func.isRequired
}

AutoCompleteField.defaultProps = {
  renderInputComponent,
  shouldRenderSuggestions: () => true,
}

export default compose(
  mapPropsStream(props$ => {
    const { handler: onTyping, stream:  onTyping$ } = createEventHandler()
    const { handler: onFetchRequested, stream:  onFetchRequested$ } = createEventHandler()
    const { handler: onClearRequested, stream:  onClearRequested$ } = createEventHandler()

    const initialState = { value: '', loading: false, suggestions: [] }
    const dispatch$ = new BehaviorSubject(initialState)

    props$
      .distinctUntilChanged(null, props => props.getId(props))
      .filter(props => props.getId(props))
      .flatMap(props => props.getById(props.getId(props)))
      .withLatestFrom(props$)
      .subscribe(([data, props]) => {
        dispatch$.next({ ...dispatch$.getValue(), value: props.getValue(data) })
      })

    onFetchRequested$
      .let(axiosCancelRequest())
      .do(() => dispatch$.next({ ...dispatch$.getValue(), loading: true }))
      .withLatestFrom(props$)
      .flatMap(([value, props]) => props.getSuggestionByKeyword(value))
      .filter(is(Array))
      .subscribe((suggestions) =>
        dispatch$.next({ ...dispatch$.getValue(), loading: false, suggestions })
      )

    onClearRequested$
      .subscribe(() => {
        dispatch$.next({ ...dispatch$.getValue(), suggestions: [] })
      })

    onTyping$
      .subscribe(({ newValue }) => {
        dispatch$.next({ ...dispatch$.getValue(), value: newValue })
      })

    onTyping$
      .filter(compose(equals('type'), prop('method')))
      .withLatestFrom(props$)
      .subscribe(([value, props]) => props.input.onChange(null))

    return props$
      .combineLatest(dispatch$.asObservable(), (props, state) => {
        return { ...props, state, onTyping, onFetchRequested, onClearRequested }
      })
  }),
  withStyles(styles)
)(AutoCompleteField)
