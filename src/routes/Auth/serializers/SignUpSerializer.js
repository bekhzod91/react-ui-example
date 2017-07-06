import _ from 'lodash'

export const signUpSerializer = (formValue) => {
  return {
    email: _.get(formValue, 'email'),
    company: _.get(formValue, 'company'),
    'first_name': _.get(formValue, 'firstName'),
    'second_name': _.get(formValue, 'secondName'),
    password: _.get(formValue, 'password'),
  }
}
