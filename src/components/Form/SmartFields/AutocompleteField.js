import Rx from 'rxjs'
import React from 'react'
import { compose, mapPropsStream, createEventHandler } from 'recompose'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import withStyles from 'material-ui/styles/withStyles'
import axios from '../../../helpers/axios'

function renderInput (inputProps) {
  const { classes, autoFocus, value, label, margin, fullWidth, ref, loading, ...other } = inputProps

  return (
    <TextField
      label={label}
      autoFocus={autoFocus}
      value={value}
      inputRef={ref}
      margin={margin}
      fullWidth={fullWidth}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  )
}

function renderSuggestion (suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query)
  const parts = parse(suggestion.name, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={index} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          )
        })}
      </div>
    </MenuItem>
  )
}

function renderSuggestionsContainer (options) {
  const { containerProps, children } = options

  return (
    <Paper {...containerProps} square={true}>
      {children}
    </Paper>
  )
}

function getSuggestionValue (suggestion) {
  return suggestion.name
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
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
})

const AutocompleteField = ({ classes, label, placeholder, margin, fullWidth, ...props }) => (
  <Autosuggest
    theme={{
      container: classes.container,
      suggestionsContainerOpen: classes.suggestionsContainerOpen,
      suggestionsList: classes.suggestionsList,
      suggestion: classes.suggestion,
    }}
    renderInputComponent={renderInput}
    suggestions={props.state.suggestions}
    onSuggestionsFetchRequested={props.onFetchRequested}
    onSuggestionsClearRequested={props.onClearRequested}
    renderSuggestionsContainer={renderSuggestionsContainer}
    getSuggestionValue={getSuggestionValue}
    renderSuggestion={renderSuggestion}
    shouldRenderSuggestions={() => true}
    inputProps={{
      classes,
      label,
      margin,
      placeholder,
      fullWidth,
      value: props.state.value,
      loading: props.state.loading,
      onChange: (event, { newValue }) => props.onChange(newValue),
    }}
  />
)

AutocompleteField.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onFetchRequested: PropTypes.func.isRequired,
  onClearRequested: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  margin: PropTypes.string,
  fullWidth: PropTypes.bool
}

const initialState = { value: '', loading: false, suggestions: [] }
const method = ({ value }) => {
  return axios({
    getState: () => ({
      signIn: { data: { token: '044143500d0e034c9038a112dac1694ee2a9d06b' } }
    })
  }).get('http://localhost:8000/api/v1/companies/', { params: { search: value } })
}

export default compose(
  mapPropsStream(props$ => {
    const { handler: onChange, stream:  onChange$ } = createEventHandler()
    const { handler: onFetchRequested, stream:  onFetchRequested$ } = createEventHandler()
    const { handler: onClearRequested, stream:  onClearRequested$ } = createEventHandler()

    const dispatch$ = new Rx.BehaviorSubject(initialState)

    onFetchRequested$
      .do(() => dispatch$.next({ ...dispatch$.getValue(), loading: true }))
      .flatMap(method)
      .subscribe((response) => {
        dispatch$.next({ ...dispatch$.getValue(), loading: false, suggestions: response.data.results })
      })

    onClearRequested$
      .subscribe(() => {
        dispatch$.next({ ...dispatch$.getValue(), suggestions: [] })
      })

    onChange$
      .subscribe((value) => {
        dispatch$.next({ ...dispatch$.getValue(), value })
      })

    return props$
      .combineLatest(dispatch$.asObservable(), (props, state) => {
        return { ...props, state, onChange, onFetchRequested, onClearRequested }
      })
  }),
  withStyles(styles)
)(AutocompleteField)
