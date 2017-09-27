import R from 'ramda'

const getParamsFromUrl = (url) => {
  const [, search] = R.split('?', url)
  const searchToObject = R.pipe(
    R.split('&'),
    R.map(R.split('=')),
    R.fromPairs
  )
  return search ? searchToObject(search) : ''
}

const paramsToSearch = R.pipe(
  R.toPairs,
  R.map(R.join('=')),
  R.join('&')
)

const getPathnameFromUrl = R.pipe(
  R.split('?'),
  R.head
)

const appendParamsToUrl = (appendParams, url) => {
  const pathname = getPathnameFromUrl(url)
  const params = getParamsFromUrl(url)
  const newParams = R.merge(params, appendParams)

  return pathname + '?' + paramsToSearch(newParams)
}

const removeItemFromSelect = (url, key, value) => {
  const params = getParamsFromUrl(url)
  const values = R.is(Array, value) ? R.map(String, value) : [String(value)]

  const selector = R.pipe(
    R.prop(key),
    R.defaultTo(''),
    R.split(','),
    R.filter(item => item),
    R.without(values),
    R.uniq,
    R.sort(R.gte),
    R.join(',')
  )(params)

  return appendParamsToUrl({ [key]: selector }, url)
}

const addItemToSelect = (url, key, value) => {
  const params = getParamsFromUrl(url)
  const values = R.is(Array, value) ? R.map(String, value) : [String(value)]
  const selector = R.pipe(
    R.prop(key),
    R.defaultTo(''),
    R.split(','),
    R.filter(item => item),
    R.concat(values),
    R.uniq,
    R.sort(R.gte),
    R.join(','),
  )(params)

  return appendParamsToUrl({ [key]: selector }, url)
}

export {
  appendParamsToUrl,
  removeItemFromSelect,
  addItemToSelect
}
