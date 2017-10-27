import React from 'react'
import { Provider } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { mount } from 'enzyme'
import IconButton from 'material-ui-next/IconButton'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import PasswordViewField from '../../../../../src/components/Form/SmartFields/PasswordViewField'
import MuiThemeProvider from '../../../../MuiThemeProvider'
import createStore from '../../../../../src/store'
import { getFormValueFromState } from '../../../../../src/helpers/get'

const FORM = 'TestForm'

describe('(Component) PasswordViewField', () => {
  let component, store

  beforeEach(() => {
    store = createStore({})

    const PasswordForm = reduxForm({ form: FORM })(({ onSubmit }) => (
      <form>
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
      <Provider store={store}>
        <MuiThemeProvider>
          <PasswordForm />
        </MuiThemeProvider>
      </Provider>
    )
  })

  it('change value', () => {
    component.find('input[name="password"]').simulate('change', { target: { value: 'password' } })

    const formValues = getFormValueFromState(FORM, store.getState())
    expect(formValues.password).to.equal('password')
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
