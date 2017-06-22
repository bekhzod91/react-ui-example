import _ from 'lodash'

export const signInSerializer = (formValue) => {
  return {
    email: _.get(formValue, 'email'),
    password: _.get(formValue, 'password'),
  }
}
