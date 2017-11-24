import {
  curry,
  compose,
  map,
  is,
  join,
  prop,
  propOr,
  path,
  pathOr,
  pick,
  startsWith,
  split,
  slice,
  keys,
  toLower,
  ifElse,
  equals,
  always
} from 'ramda'
import { getQueryFromUrl } from './urls'

export const getBooleanFromString = (boolean) => compose(
  ifElse(equals('false'), always(false), always(true)),
  toLower
)(boolean)
export const getIdFromProps = compose(parseInt, path(['params', 'id']))
export const getCompanyIdFromProps = compose(parseInt, path(['params', 'companyId']))
export const getRouteFromProps = (props) => ({
  location: prop('location', props),
  push: prop('push', props),
  companyId: getCompanyIdFromProps(props)
})

export const getFormValueFromState = curry((name, state) => pathOr({}, ['form', name, 'values'], state))
export const getFormValuesLikeParams = map((item) => {
  if (is(Array, item)) {
    return `list:${join(',', getFormValuesLikeParams(item))}`
  }

  if (is(Object, item)) {
    return `obj:${prop('id', item)}`
  }

  if (is(Number, item)) {
    return `num:${item}`
  }

  return `str:${item}`
})

const parseParam = (param) => {
  if (startsWith('list:', param)) {
    return compose(
      map(parseParam),
      split(','),
      slice(5, Infinity)
    )(param)
  }

  if (startsWith('str:', param)) {
    return slice(4, Infinity, param)
  }

  if (startsWith('num:', param)) {
    return parseFloat(slice(4, Infinity, param))
  }

  if (startsWith('obj:', param)) {
    return { id: parseInt(slice(4, Infinity, param)) }
  }

  return null
}
export const getParamsLikeFormValues = curry((fields, params) =>
  compose(
    map(parseParam),
    pick(fields),
  )(params)
)

export const getInitialFormValuesFromProps = curry((name, state, props) => {
  const fields = keys(pathOr({}, ['form', name, 'registeredFields'], state))
  const params = getQueryFromUrl(pathOr('', ['location', 'search'], props)) || {}

  return getParamsLikeFormValues(fields, params)
})

export const getDataFromState = curry((name, state) => ({
  loading: path([name, 'loading'], state),
  data: path([name, 'data'], state),
}))

export const getParamsLikeBooleanFromLocation = curry((name, location) => compose(
  getBooleanFromString,
  propOr('false', name),
  getQueryFromUrl,
  prop('search'),
)(location))
export const getFullPathFromLocation = (location) => `${prop('pathname', location)}${prop('search', location)}`
export const getFullPathFromRoute = ({ location }) => getFullPathFromLocation(location)
export const getFullPathFromProps = ({ route }) => getFullPathFromRoute(route)
export const getQueryValueFormLocation = curry((key, location) => compose(
  prop(key),
  getQueryFromUrl,
  getFullPathFromLocation,
)(location))
export const getQueryValueFormRoute = curry((key, { location }) => getQueryValueFormLocation(key, location))
export const getQueryValueFormProps = curry((key, { route }) => getQueryValueFormRoute(key, route))
export const getPayloadFromSuccess = prop('data')
export const getPayloadFromError = compose(
  (data) => Promise.reject(data),
  path(['response', 'data'])
)
