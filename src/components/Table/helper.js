import {
  any, compose, curry, equals, filter, findLast, gte, isNil, map,
  not, pathOr, pipe, prop, sort, split, path, defaultTo,
  without
} from 'ramda'
import { parseParams } from '../../helpers/urls'
import { CHECKBOX_PARAM } from './constant'

export const getIdsFromList = pipe(
  pathOr([], ['data', 'results']),
  map(pipe(prop('id'), parseInt)),
  sort(gte)
)

export const selectIdsIncludeListIds = curry((selectIds, listIds) =>
  equals(
    without(without(listIds, selectIds), selectIds),
    listIds
  )
)

export const selectIdsIncludeAnyListIds = curry((selectIds, listIds) =>
  pipe(
    map((item) => !isNil(findLast(equals(item), selectIds))),
    any(equals(true))
  )(listIds)
)

export const getSelectIdsFromRoute = pipe(
  path(['location', 'search']),
  parseParams,
  prop(CHECKBOX_PARAM),
  defaultTo(''),
  split(','),
  map(parseInt),
  filter(pipe(isNaN, not)),
  sort(gte)
)

export const getPage = compose(
  parseInt,
  defaultTo(1),
  prop('page'),
  parseParams,
  path(['location', 'search'])
)

export const getRowsPerPage = curry((defaultRowsPerPage, props) =>
  compose(
    parseInt,
    defaultTo(defaultRowsPerPage),
    prop('rowsPerPage'),
    parseParams,
    path(['location', 'search'])
  )(props)
)
