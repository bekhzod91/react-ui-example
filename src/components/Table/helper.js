import {
  any, compose, curry, equals, filter, findLast, gte, head, isNil, map,
  not, pathOr, pipe, prop, sort, split, whereEq, path, defaultTo,
  without
} from 'ramda'
import React from 'react'
import { parseParams } from '../../helpers/urls'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

export const getIdsFromList = curry((getById, list) => pipe(
  pathOr([], ['data', 'results']),
  map(pipe(getById, parseInt)),
  sort(gte)
)(list))

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
  pathOr('', ['location', 'query', 'select']),
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

const cloneFromChildren = curry((part, props, children) =>
  pipe(
    filter(whereEq({ type: part })),
    head,
    item => item && React.cloneElement(item, props)
  )(children)
)

export const renderTableBodyFromProps = ({ children, route, list, detail, ...defaultProps }) => {
  const { onCheckItem, getById, checkboxEnable } = defaultProps
  const results = pathOr([], ['data', 'results'], list)
  const loading = prop('loading', list)
  const selectIds = getSelectIdsFromRoute(route)

  if (loading) {
    return null
  }

  return cloneFromChildren(TableRow, {
    list: results, detail, checkboxEnable, selectIds, getById, onCheckItem
  })(children)
}

export const renderTableHeaderFromProps = ({ children, route, list, ...defaultProps }) => {
  const { onCheckAll, onUnCheckAll, checkboxEnable, getById } = defaultProps
  const listIds = getIdsFromList(getById, list)
  const selectIds = getSelectIdsFromRoute(route)
  const checkboxIsChecked = selectIdsIncludeListIds(selectIds, listIds)
  const checkboxMinusChecked = !checkboxIsChecked ? selectIdsIncludeAnyListIds(selectIds, listIds) : false

  return cloneFromChildren(TableHeader, {
    route, checkboxEnable, checkboxIsChecked, checkboxMinusChecked, onCheckAll, onUnCheckAll
  })(children)
}
