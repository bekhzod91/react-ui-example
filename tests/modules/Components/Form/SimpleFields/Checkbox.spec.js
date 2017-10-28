import React from 'react'
import { Provider } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { mount } from 'enzyme'
import Checkbox from '../../../../../src/components/Form/SimpleFields/Checkbox'
import validate from '../../../../../src/helpers/validate'
import MuiThemeProvider from '../../../../MuiThemeProvider'
import createStore from '../../../../../src/store'
import { getFormValueFromState } from '../../../../../src/helpers/get'

const FORM = 'TestForm'

describe('(Component) Checkbox', () => {
  let component, store

  beforeEach(() => {
    store = createStore({})

    const TextForm = reduxForm({ form: FORM })(({ handleSubmit }) => (
      <form onSubmit={handleSubmit(() => validate({ checkbox: ['This field is required.'] }))}>
        <Field
          name="checkbox"
          component={Checkbox}
          label="Checkbox"
          placeholder="Check checkbox"
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
    component.find('input[type="checkbox"]').simulate('change', { target: { value: true } })

    const formValues = getFormValueFromState(FORM, store.getState())
    expect(formValues.checkbox).to.equal(true)
  })

  it('error', () => {
    component.find('form').simulate('submit')

    expect(component.find(Checkbox).first().props().meta.error[0]).to.equal('This field is required.')
  })
})
