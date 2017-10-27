import React from 'react'
import { Provider } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { mount } from 'enzyme'
import TextField from '../../../../../src/components/Form/SimpleFields/TextField'
import validate from '../../../../../src/helpers/validate'
import MuiThemeProvider from '../../../../MuiThemeProvider'
import createStore from '../../../../../src/store'
import { getFormValueFromState } from '../../../../../src/helpers/get'

const FORM = 'TestForm'

describe('(Component) TextField', () => {
  let component, store

  beforeEach(() => {
    store = createStore({})

    const TextForm = reduxForm({ form: FORM })(({ handleSubmit }) => (
      <form onSubmit={handleSubmit(() => validate({ text: ['This field is required.'] }))}>
        <Field
          name="text"
          component={TextField}
          label="Text"
          placeholder="Enter Text"
          fullWidth={true}
          margin="normal"
        />
      </form>
    ))

    component = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <TextForm />
        </MuiThemeProvider>
      </Provider>
    )
  })

  it('change value', () => {
    component.find('input[name="text"]').simulate('change', { target: { value: 'text' } })

    const formValues = getFormValueFromState(FORM, store.getState())
    expect(formValues.text).to.equal('text')
  })

  it('error', () => {
    component.find('form').simulate('submit')

    expect(component.find(TextField).first().props().meta.error[0]).to.equal('This field is required.')
  })
})
