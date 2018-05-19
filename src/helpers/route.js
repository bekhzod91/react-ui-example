import { curry, compose, defaultTo, path, assoc, __ } from 'ramda'
import { appendParamsToUrl } from './urls'

export const redirect = curry(({ pathname, params }, history) =>
  compose(
    history.push,
    appendParamsToUrl(params),
    defaultTo(path(['location', 'pathname'], history))
  )(pathname)
)

export const addParamsRoute = curry((params, history) =>
  compose(
    redirect(__, history),
    assoc('pathname', __, {}),
    appendParamsToUrl(params),
    path(['location', 'search']),
  )(history)
)
