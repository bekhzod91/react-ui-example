import { curry, compose, defaultTo, path, concat, __ } from 'ramda'
import { appendParamsToUrl } from './urls'

export const redirect = curry(({ pathname, params }, history) =>
  compose(
    history.push,
    appendParamsToUrl(params),
    concat(__, path(['location', 'search'], history)),
    defaultTo(path(['location', 'pathname'], history))
  )(pathname)
)
