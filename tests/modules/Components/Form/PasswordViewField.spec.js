import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { mount } from 'enzyme'
import IconButton from 'material-ui/IconButton'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import validate from '../../../../src/helpers/validate'
import { getFormValueFromState } from '../../../../src/helpers/form'
import createStore from '../../../../src/store/createStore'
import WrapperProvider from '../../../WrapperProvider'
import PasswordViewField from '../../../../src/components/Form/PasswordViewField'

const FORM = 'TestForm'

describe('(Component) PasswordViewField', () => {
  let component, store

  beforeEach(() => {
    store = createStore({})

    const PasswordForm = reduxForm({ form: FORM })(({ handleSubmit }) => (
      <form onSubmit={handleSubmit(() => validate({ password: ['This field is required.'] }))}>
        <Field
          name="password"
          component={PasswordViewField}
          label="Password"
          placeholder="Enter Password"
          fullWidth={true}
          margin="normal"
        />
      </form>
    ))

    component = mount(
      <WrapperProvider store={store}>
        <PasswordForm />
      </WrapperProvider>
    )
  })

  it('change value', () => {
    component.find('input[name="password"]').simulate('change', { target: { value: 'password' } })

    const formValues = getFormValueFromState(FORM, store.getState())
    expect(formValues.password).to.equal('password')
  })

  it('error', () => {
    component.find('form').simulate('submit')

    expect(component.find(PasswordViewField).first().props().meta.error[0]).to.equal('This field is required.')
  })

  it('password hide by default', () => {
    expect(component.find(Visibility)).to.have.lengthOf(1)
    expect(component.find(VisibilityOff)).to.have.lengthOf(0)
  })

  it('password showing keypress Enter', () => {
    component.find(IconButton).first().simulate('keypress', { key: 'Enter' })

    expect(component.find(Visibility)).to.have.lengthOf(0)
    expect(component.find(VisibilityOff)).to.have.lengthOf(1)

    component.find(IconButton).first().simulate('keyup')

    expect(component.find(Visibility)).to.have.lengthOf(1)
    expect(component.find(VisibilityOff)).to.have.lengthOf(0)
  })

  it('password showing keypress Space', () => {
    component.find(IconButton).first().simulate('keypress', { key: ' ' })

    expect(component.find(Visibility)).to.have.lengthOf(0)
    expect(component.find(VisibilityOff)).to.have.lengthOf(1)

    component.find(IconButton).first().simulate('keyup')

    expect(component.find(Visibility)).to.have.lengthOf(1)
    expect(component.find(VisibilityOff)).to.have.lengthOf(0)
  })

  it('password showing keypress onMouseDown', () => {
    component.find(IconButton).first().simulate('mousedown')

    expect(component.find(Visibility)).to.have.lengthOf(0)
    expect(component.find(VisibilityOff)).to.have.lengthOf(1)

    component.find(IconButton).first().simulate('mouseup')

    expect(component.find(Visibility)).to.have.lengthOf(1)
    expect(component.find(VisibilityOff)).to.have.lengthOf(0)
  })
})
