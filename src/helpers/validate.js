import { prop } from 'ramda'
import { SubmissionError } from 'redux-form'

const validate = (data) => {
  const nonFieldErrors = prop('nonFieldErrors', data) || prop('detail', data)

  throw new SubmissionError({
    ...data,
    _error: nonFieldErrors
  })
}

export default validate
