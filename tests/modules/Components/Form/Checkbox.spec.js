import { mount } from 'enzyme'
import { Field, reduxForm } from 'redux-form'
import React from 'react'
import Checkbox from '../../../../src/components/Form/Checkbox'
import validate from '../../../../src/helpers/validate'
import WrapperProvider from '../../../WrapperProvider'
import createStore from '../../../../src/store/createStore'
import { getFormValueFromState } from '../../../../src/helpers/form'

const FORM = 'TestForm'

describe('(Component) Checkbox', () => {
  let component, store

  beforeEach(() => {
    store = createStore({})
    const enhance = reduxForm({ form: FORM })

    const TextForm = enhance(props => (
      <form onSubmit={props.handleSubmit(() => validate({ checkbox: ['This field is required.'] }))}>
        <Field
          name="checkbox"
          component={Checkbox}
          label="Checkbox"
          placeholder="Check checkbox"
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
    component.find('input[type="checkbox"]').simulate('change', { target: { value: true } })

    const formValues = getFormValueFromState(FORM, store.getState())
    expect(formValues.checkbox).to.equal(true)
  })

  it('error', () => {
    component.find('form').simulate('submit')

    expect(component.find(Checkbox).first().props().meta.error[0]).to.equal('This field is required.')
  })
})
