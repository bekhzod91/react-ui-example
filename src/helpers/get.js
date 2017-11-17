import { curry, compose, map, is, join, prop, path, pathOr } from 'ramda'
import { getQueryFromUrl } from './urls'

export const getIdFromProps = compose(parseInt, path(['params', 'id']))
export const getCompanyIdFromProps = compose(parseInt, path(['params', 'companyId']))
export const getRouteFromProps = (props) => ({
  location: prop('location', props),
  push: prop('push', props),
  companyId: getCompanyIdFromProps(props)
})

export const getFormValueFromState = curry((name, state) => pathOr({}, ['form', name, 'values'], state))
export const getFormValuesToUrl = map((item) => {
  if (is(Array, item)) {
    return join(',', getFormValuesToUrl(item))
  }

  if (is(Object, item)) {
    return prop('id', item)
  }

  return item
})

export const getDataFromState = curry((name, state) => ({
  loading: path([name, 'loading'], state),
  data: path([name, 'data'], state),
}))

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
