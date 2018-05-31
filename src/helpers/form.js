import {
  compose, curry, pathOr, pick, path,
} from 'ramda'
import moment from 'moment'
import { parseParams } from './urls'
import { decodeURLParams } from './mapper'

export const getFormValueFromState = curry((name, state) => pathOr({}, ['form', name, 'values'], state))
const fromMoment = compose((val) => moment(val, 'X'), parseInt)
export const getFormInitValueFromHistory = curry((fields, history) => compose(
  decodeURLParams,
  pick(fields),
  parseParams,
  path(['location', 'search']),
)(history))
