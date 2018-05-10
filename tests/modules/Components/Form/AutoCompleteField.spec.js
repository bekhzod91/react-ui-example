import { prop, path, findLast, whereEq, head } from 'ramda'
import React from 'react'
import { pure } from 'recompose'
import { mount } from 'enzyme'
import { Field, reduxForm } from 'redux-form'
import { MenuItem } from 'material-ui/Menu'
import Autosuggest from 'react-autosuggest'
import WrapperProvider from '../../../WrapperProvider'
import createStore from '../../../../src/store/createStore'
import { getFormValueFromState } from '../../../../src/helpers/form'
import validate from '../../../../src/helpers/validate'
import AutoCompleteField from '../../../../src/components/Form/AutoCompleteField'

const FORM = 'TestForm'
const SEARCH_RESULTS = [
  { id: 1, name: 'Name 1' },
  { id: 2, name: 'Name 2' },
]

const SearchField = (pure)((props) => (
  <AutoCompleteField
    {...props}
    getSuggestionByKeyword={() => Promise.resolve(SEARCH_RESULTS)}
    getSuggestionValue={(onChange, suggestion) => {
      const id = prop('id', suggestion)
      const name = prop('name', suggestion)
      onChange({ id, name })

      return 'name'
    }}
    renderSuggestion={(suggestion) => {
      return (
        <MenuItem component="div">
          <div>{prop('name', suggestion)}</div>
        </MenuItem>
      )
    }}
    getById={(id) => Promise.resolve(findLast(whereEq({ id: id }), SEARCH_RESULTS))}
    getId={path(['input', 'value', 'id'])}
    getValue={(value) => prop('name', value)}
  />
))

describe('(Component) AutoCompleteField', () => {
  let component, store

  beforeEach(() => {
    store = createStore({})

    const SearchForm = reduxForm({ form: FORM })(({ handleSubmit }) => (
      <form onSubmit={handleSubmit(() => validate({ search: ['This field is required.'] }))}>
        <Field
          name="search"
          component={SearchField}
          label="Search"
          placeholder="Enter search"
          fullWidth={true}
          margin="normal"
        />
      </form>
    ))

    component = mount(
      <WrapperProvider store={store}>
        <SearchForm />
      </WrapperProvider>
    )
  })

  it('suggestions on focus', (done) => {
    component.find('input[name="search"]').simulate('focus')

    setTimeout(() => {
      expect(component.find(Autosuggest).first().instance().props.suggestions).to.eql(SEARCH_RESULTS)

      done()
    })
  })

  it('select value', () => {
    component.find(AutoCompleteField).first().instance().props.input.onChange(head(SEARCH_RESULTS))

    const formValues = getFormValueFromState(FORM, store.getState())
    expect(formValues.search).to.eql(head(SEARCH_RESULTS))
  })

  it('error', () => {
    component.find('form').simulate('submit')

    expect(component.find(SearchField).first().props().meta.error[0]).to.equal('This field is required.')
  })
})
