import _ from 'lodash'
import toCamelCase from './toCamelCase'
import { SubmissionError } from 'redux-form'

const validate = (data) => {
  const nonFieldErrors = _.get(data, 'nonFieldErrors') || _.get(data, 'detail')

  throw new SubmissionError({
    ...data,
    _error: nonFieldErrors
  })
}

export default validate
