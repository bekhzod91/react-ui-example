import { prop } from 'ramda'
import { SubmissionError } from 'redux-form'

const validate = (data) => {
  const nonFieldErrors = prop('nonFieldErrors', data) || prop('detail', data)

  throw new SubmissionError({
    ...data,
    _error: nonFieldErrors
  })
}

export const getReduxFormError = data => ({
  ...data,
  _error: prop('nonFieldErrors', data) || prop('detail', data)
})

export default validate
