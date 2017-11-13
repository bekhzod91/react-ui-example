import React from 'react'
import { compose, withReducer, mapPropsStream, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import withStyles from 'material-ui/styles/withStyles'

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
]

function renderInput (inputProps) {
  const { classes, autoFocus, value, label, margin, fullWidth, ref, ...other } = inputProps

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
  const matches = match(suggestion.label, query)
  const parts = parse(suggestion.label, matches)

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
  return suggestion.label
}

function getSuggestions (value) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep =
        count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue

      if (keep) {
        count += 1
      }

      return keep
    })
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
    onSuggestionsFetchRequested={props.handleSuggestionsFetchRequested}
    onSuggestionsClearRequested={props.handleSuggestionsClearRequested}
    renderSuggestionsContainer={renderSuggestionsContainer}
    getSuggestionValue={getSuggestionValue}
    renderSuggestion={renderSuggestion}
    inputProps={{
      autoFocus: true,
      classes,
      label,
      margin,
      placeholder,
      fullWidth,
      value: props.state.value,
      onChange: props.handleChange,
    }}
  />
)

AutocompleteField.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSuggestionsFetchRequested: PropTypes.func.isRequired,
  handleSuggestionsClearRequested: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  margin: PropTypes.string,
  fullWidth: PropTypes.bool
}

const initialState = { value: '', suggestions: [] }

export default compose(
  withStyles(styles),
  withReducer('state', 'setState', (value = initialState, newValue) => {
    return {
      ...value,
      ...newValue,
    }
  }),
  mapPropsStream(props$ => {
    return props$
  }),
  withHandlers({
    handleSuggestionsFetchRequested: ({ setState }) => ({ value }) => {
      setState({ suggestions: getSuggestions(value) })
    },

    handleSuggestionsClearRequested: ({ setState }) => () => {
      setState({ suggestions: [] })
    },

    handleChange: ({ setState }) => (event, { newValue }) => {
      setState({ value: newValue })
    }
  })
)(AutocompleteField)
