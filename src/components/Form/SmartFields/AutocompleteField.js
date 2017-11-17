import { BehaviorSubject } from 'rxjs'
import { compose, prop, is, equals } from 'ramda'
import React from 'react'
import { compose as composeR, mapPropsStream, createEventHandler } from 'recompose'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import withStyles from 'material-ui/styles/withStyles'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import CircularProgress from 'material-ui/Progress/CircularProgress'
import Fade from 'material-ui/transitions/Fade'
import ClearIcon from 'material-ui-icons/Clear'
import { axiosCancelRequest } from '../../../helpers/cancel'
import TextField from '../SimpleFields/TextField'

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
      <Fade in={loading}>
        <CircularProgress size={28} className={classes.action} />
      </Fade>
      <Fade in={!loading && value}>
        <IconButton className={classes.action} onClick={onClick}>
          <ClearIcon />
        </IconButton>
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
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  action: {
    top: 28,
    right: 0,
    width: 28,
    height: 28,
    position: 'absolute',
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

const AutocompleteField = ({ classes, label, placeholder, margin, fullWidth, input, meta, ...props }) => {
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
      getSuggestionValue={props.getSuggestionValue(input.onChange)}
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

AutocompleteField.defaultProps = {
  renderInputComponent,
  shouldRenderSuggestions: () => true
}

AutocompleteField.propTypes = {
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
  renderInputComponent: PropTypes.func.isRequired,
  renderSuggestion: PropTypes.func.isRequired,
  getSuggestionValue: PropTypes.func.isRequired,
  shouldRenderSuggestions: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
}

export default composeR(
  mapPropsStream(props$ => {
    const { handler: onTyping, stream:  onTyping$ } = createEventHandler()
    const { handler: onFetchRequested, stream:  onFetchRequested$ } = createEventHandler()
    const { handler: onClearRequested, stream:  onClearRequested$ } = createEventHandler()

    const initialState = { value: '', loading: false, suggestions: [] }
    const dispatch$ = new BehaviorSubject(initialState)

    onFetchRequested$
      .let(axiosCancelRequest())
      .do(() => dispatch$.next({ ...dispatch$.getValue(), loading: true }))
      .withLatestFrom(props$)
      .flatMap(([value, props]) => props.search(value))
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
)(AutocompleteField)
