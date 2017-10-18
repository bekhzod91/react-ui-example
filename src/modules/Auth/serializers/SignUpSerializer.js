import * as R from 'ramda'

export const signUpSerializer = (formValue) => {
  return {
    email: R.prop('email', formValue),
    company: R.prop('company', formValue),
    'first_name': R.prop('firstName', formValue),
    'second_name': R.prop('secondName', formValue),
    password: R.prop('password', formValue),
  }
}
