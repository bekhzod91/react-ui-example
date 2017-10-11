import R from 'ramda'

const getQueryFromUrl = (url) => {
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
  const params = getQueryFromUrl(url)
  const newParams = R.merge(params, appendParams)

  return pathname + '?' + paramsToSearch(newParams)
}

const sortingStatus = (url, key, value) => {
  const params = getQueryFromUrl(url)
  const currentValue = R.pipe(
    R.pathOr('', [key]),
    R.split(','),
    R.findLast(R.endsWith(value))
  )(params)

  if (R.isNil(currentValue)) {
    return 'not'
  }

  return R.pipe(
    R.prop(0),
    R.equals('-'),
    descSort => descSort ? 'desc' : 'asc',
  )(currentValue)
}

const sortingUrl = (url, key, value) => {
  const params = getQueryFromUrl(url)
  const sortValues = R.prop(key, params) || ''
  const possibleValue = { 'not': value, 'asc': `-${value}`, 'desc': '' }
  const status = sortingStatus(url, key, value)
  const newValue = R.pipe(
    R.split(','),
    R.filter(R.pipe(R.endsWith(value), R.not)),
    R.append(R.prop(status, possibleValue)),
    R.filter(R.pipe(R.isEmpty, R.not)),
    R.reverse,
    R.join(',')
  )(sortValues)

  return appendParamsToUrl({ [key]: newValue }, url)
}

const removeItemFromSelect = (url, key, value) => {
  const params = getQueryFromUrl(url)
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
  const params = getQueryFromUrl(url)
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
  getQueryFromUrl,
  appendParamsToUrl,
  sortingUrl,
  sortingStatus,
  removeItemFromSelect,
  addItemToSelect
}
