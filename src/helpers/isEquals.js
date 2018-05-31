import {compose, path, omit, equals, curry, either, not, isEmpty, filter, isNil} from 'ramda'
import { parseParams } from './urls'

export const IGNORE_PARAMS = ['ids', 'filter', 'create']

const getParamsFromProps = ({ history }, ignore = IGNORE_PARAMS) => compose(
  filter(compose(not, either(isNil, isEmpty))),
  omit(IGNORE_PARAMS),
  parseParams,
  path(['location', 'search'])
)(history)

export const isEqualSearch = curry((ignore, prev, current) =>
  equals(getParamsFromProps(prev, ignore), getParamsFromProps(current, ignore))
)
