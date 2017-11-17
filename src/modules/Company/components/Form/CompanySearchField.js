import { curry, prop, path, equals, __ } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { compose, mapPropsStream } from 'recompose'
import { MenuItem } from 'material-ui/Menu'
import axios from '../../../../helpers/axios'
import * as API from '../../../../constants/api'
import AutocompleteField from '../../../../components/Form/SmartFields/AutocompleteField'

const CompanySearchField = ({ ...props }) => {
  return (
    <AutocompleteField {...props} />
  )
}

CompanySearchField.propTypes = {
  search: PropTypes.func.isRequired,
  getSuggestionValue: PropTypes.func.isRequired
}

export default compose(
  mapPropsStream(props$ => {
    const search = ([{ value }, token]) => {
      return axios({
        getState: () => ({
          signIn: { data: { token: '044143500d0e034c9038a112dac1694ee2a9d06b' } }
        })
      })
        .get(`${API.API_URL}/companies/`, { cancelToken: token, params: { search: value } })
        .then(path(['data', 'results']))
        .catch(() => new Error('Request canceled'))
    }

    const renderSuggestion = curry((suggestion, query, value) => {
      const selected = equals(prop('id', suggestion), prop('id', value))

      return (
        <MenuItem selected={selected} component="div">
          <div>{prop('name', suggestion)}</div>
        </MenuItem>
      )
    })

    const getSuggestionValue = curry((onChange, suggestion) => {
      onChange(suggestion)

      return prop('name', suggestion)
    })

    return props$.combineLatest(props => ({
      ...props, search, getSuggestionValue, renderSuggestion: renderSuggestion(__, __, props.input.value)
    }))
  })
)(CompanySearchField)
