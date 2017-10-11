import R from 'ramda'
import { getQueryFromUrl } from './urls'

export const getIdFromProps = R.pipe(R.path(['params', 'id']), parseInt)

export const getFormValueFromState = R.curry((name, state) => R.pathOr({}, ['form', name, 'values'], state))

export const getDataFromState = R.curry((name, state) => ({
  loading: R.path([name, 'loading'], state),
  data: R.path([name, 'data'], state),
}))

export const getFullPathFromLocation = (location) => `${R.prop('pathname', location)}${R.prop('search', location)}`
export const getFullPathFromRoute = ({ location }) => getFullPathFromLocation(location)
export const getFullPathFromProps = ({ route }) => getFullPathFromRoute(route)
export const getQueryValueFormLocation = R.curry((key, location) => R.pipe(
  getFullPathFromLocation,
  getQueryFromUrl,
  R.prop(key)
)(location))
export const getQueryValueFormRoute = R.curry((key, { location }) => getQueryValueFormLocation(key, location))
export const getQueryValueFormProps = R.curry((key, { route }) => getQueryValueFormRoute(key, route))
