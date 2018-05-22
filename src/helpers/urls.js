import {
  pipe, split, map, fromPairs, toPairs, head, join,
  merge, prop, defaultTo, filter, without, sort, uniq, gte, concat,
  is, curry
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

const removeItemFromSelect = (search, key, value) => {
  const params = parseParams(search)
  const values = is(Array, value) ? map(String, value) : [String(value)]

  return pipe(
    prop(key),
    defaultTo(''),
    split(','),
    filter(item => item),
    without(values),
    uniq,
    sort(gte),
    join(',')
  )(params)
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
  removeItemFromSelect,
  addItemToSelect
}
