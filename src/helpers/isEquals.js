import { compose, omit, equals, curry, either, not, isEmpty, filter, isNil } from 'ramda'
import { parseParams } from './urls'

export const IGNORE_PARAMS = ['ids', 'filter', 'create']

const excludeParams = (search, ignore) => compose(
  filter(compose(not, either(isNil, isEmpty))),
  omit(ignore),
  parseParams
)(search)

export const isEqualSearch = curry((ignore, prev, current) => {
  return equals(excludeParams(prev, ignore), excludeParams(current, ignore))
})
