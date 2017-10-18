import * as R from 'ramda'
import { SubmissionError } from 'redux-form'

const validate = (data) => {
  const nonFieldErrors = R.prop('nonFieldErrors', data) || R.prop('detail', data)

  throw new SubmissionError({
    ...data,
    _error: nonFieldErrors
  })
}

export default validate
