import {
  pipe, split, map, fromPairs, toPairs, head, join, pathOr, findLast, endsWith, isNil,
  merge, prop, equals, defaultTo, filter, without, sort, uniq, gte, concat, not, isEmpty,
  append, reverse, is, curry
} from 'ramda'

const parseParams = (url) => {
  const [, search] = split('?', url)
  const searchToObject = pipe(
    split('&'),
    map(split('=')),
    fromPairs
  )
  return search ? searchToObject(search) : {}
}

const paramsToSearch = pipe(
  toPairs,
  map(join('=')),
  join('&')
)

const getPathnameFromUrl = pipe(
  split('?'),
  head
)

const appendParamsToUrl = curry((appendParams, url) => {
  const pathname = getPathnameFromUrl(url)
  const params = parseParams(url)
  const newParams = merge(params, appendParams)

  return pathname + '?' + paramsToSearch(newParams)
})

const sortingStatus = (url, key, value) => {
  const params = parseParams(url)
  const currentValue = pipe(
    pathOr('', [key]),
    split(','),
    findLast(endsWith(value))
  )(params)

  if (isNil(currentValue)) {
    return 'not'
  }

  return pipe(
    prop(0),
    equals('-'),
    descSort => descSort ? 'desc' : 'asc',
  )(currentValue)
}

const sortingUrl = (url, key, value) => {
  const params = parseParams(url)
  const sortValues = prop(key, params) || ''
  const possibleValue = { 'not': value, 'asc': `-${value}`, 'desc': '' }
  const status = sortingStatus(url, key, value)
  const newValue = pipe(
    split(','),
    filter(pipe(endsWith(value), not)),
    append(prop(status, possibleValue)),
    filter(pipe(isEmpty, not)),
    reverse,
    join(',')
  )(sortValues)

  return appendParamsToUrl({ [key]: newValue }, url)
}

const removeItemFromSelect = (url, key, value) => {
  const params = parseParams(url)
  const values = is(Array, value) ? map(String, value) : [String(value)]

  const selector = pipe(
    prop(key),
    defaultTo(''),
    split(','),
    filter(item => item),
    without(values),
    uniq,
    sort(gte),
    join(',')
  )(params)

  return appendParamsToUrl({ [key]: selector }, url)
}

const addItemToSelect = (url, key, value) => {
  const params = parseParams(url)
  const values = is(Array, value) ? map(String, value) : [String(value)]
  const selector = pipe(
    prop(key),
    defaultTo(''),
    split(','),
    filter(item => item),
    concat(values),
    uniq,
    sort(gte),
    join(','),
  )(params)

  return appendParamsToUrl({ [key]: selector }, url)
}

export {
  parseParams,
  appendParamsToUrl,
  sortingUrl,
  sortingStatus,
  removeItemFromSelect,
  addItemToSelect
}
