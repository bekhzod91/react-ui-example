import { prop } from 'ramda'

export const signUpSerializer = (formValue) => {
  return {
    email: prop('email', formValue),
    company: prop('company', formValue),
    'first_name': prop('firstName', formValue),
    'second_name': prop('secondName', formValue),
    password: prop('password', formValue),
  }
}
