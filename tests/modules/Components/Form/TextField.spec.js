import { mount } from 'enzyme'
import { Field, reduxForm } from 'redux-form'
import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '../../../../src/components/Form/TextField'
import validate from '../../../../src/helpers/validate'
import WrapperProvider from '../../../WrapperProvider'
import createStore from '../../../../src/store/createStore'
import { getFormValueFromState } from '../../../../src/helpers/form'

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
      <WrapperProvider store={store}>
        <TextForm />
      </WrapperProvider>
    )
  })

  it('change value', () => {
    component.find('input[name="text"]').simulate('change', { target: { value: 'text' } })

    const formValues = getFormValueFromState(FORM, store.getState())
    expect(formValues.text).to.equal('text')
  })

  it('error', () => {
    component.find('form').simulate('submit')

    expect(component.find(FormHelperText).at(0).instance().props.children[0]).to.equal('This field is required.')
  })
})
