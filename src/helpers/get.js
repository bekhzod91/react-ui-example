import {
  curry,
  compose,
  prop,
  propOr,
  path,
  pick,
  filter,
  keys,
  toLower,
  ifElse,
  equals,
  always,
  length,
  clone,
  isEmpty,
  findIndex, omit, map, not, either, isNil,
} from 'ramda'
import sprintf from 'sprintf'
import { parseParams } from './urls'
import { parseUrlParams, serializer } from './form'

export const getBooleanFromString = (boolean) => compose(
  ifElse(equals('false'), always(false), always(true)),
  toLower
)(boolean)
export const getIdFromProps = compose(parseInt, path(['match', 'params', 'id']))
export const getCompanyIdFromProps = compose(parseInt, path(['params', 'companyId']))
export const getParamsIdFromProps = curry((param, props) => compose(parseInt, path(['params', param]))(props))
export const getRouteFromProps = (props) => ({
  location: prop('location', props),
  push: prop('push', props),
  params: prop('params', props),
  companyId: getCompanyIdFromProps(props)
})

export const getParamsCountFromLocation = curry((fields, location) => compose(
  length,
  keys,
  filter(Boolean),
  pick(fields),
  ifElse(isEmpty, always({}), clone),
  parseParams,
  prop('search'),
)(location))

export const getRequestFromParams = compose(
  serializer,
  map(parseUrlParams),
  filter(compose(not, either(isNil, isEmpty)))
)

export const getDataFromState = curry((name, state) => ({
  loading: path([name, 'loading'], state),
  data: path([name, 'data'], state),
}))

export const getParamsLikeBooleanFromLocation = curry((name, location) => compose(
  getBooleanFromString,
  propOr('false', name),
  parseParams,
  prop('search'),
)(location))
export const getFullPathFromLocation = (location) => `${prop('pathname', location)}${prop('search', location)}`
export const getFullPathFromRoute = ({ location }) => getFullPathFromLocation(location)
export const getFullPathFromProps = ({ route }) => getFullPathFromRoute(route)
export const getQueryValueFormLocation = curry((key, location) => compose(
  prop(key),
  parseParams,
  getFullPathFromLocation,
)(location))
export const getQueryValueFormRoute = curry((key, { location }) => getQueryValueFormLocation(key, location))
export const getQueryValueFormProps = curry((key, { route }) => getQueryValueFormRoute(key, route))
export const getPayloadFromSuccess = prop('data')
export const getPayloadFromError = compose(
  (data) => Promise.reject(data),
  path(['response', 'data'])
)
export const getIndexByTabName = curry((tabs, tabName) => findIndex(equals(tabName), tabs))
export const getListRequestFromProps = compose(
  getRequestFromParams,
  omit(['select', 'filter', 'create']),
  path(['location', 'query'])
)

export const getFullPathWithCompanyId = (url, route) => {
  const companyId = parseInt(path(['params', 'companyId'], route))
  const search = prop('search', location)
  const pathname = sprintf(url, companyId)
  return `${pathname}${search}`
}

export const getFullPathByTab = (route, url, tab) => {
  const companyId = parseInt(path(['params', 'companyId'], route))
  const id = parseInt(path(['params', 'id'], route))
  const search = prop('search', location)
  const pathname = sprintf(url, companyId, id, tab)
  return `${pathname}${search}`
}

export const getCurrentTabIndex = curry((tabs, route) => findIndex(equals(path(['params', 'tab'], route)), tabs))
