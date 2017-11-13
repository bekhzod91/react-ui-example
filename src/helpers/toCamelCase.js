import {
  is,
  compose,
  curry,
  keys,
  map,
  values,
  zipObj
} from 'ramda'

export let mapKeys = curry((fn, obj) => zipObj(map(fn, keys(obj)), values(obj)))

const camelize = (str) => {
  return str
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/(?:^\w|[A-Z]|_|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    }).replace(/\s+/g, '')
}

const toCamelCase = (data) => {
  if (is(Array, data)) {
    return map(toCamelCase, data)
  }

  if (is(Object, data)) {
    return compose(
      map(toCamelCase),
      mapKeys(camelize)
    )(data)
  }

  return data
}

export default toCamelCase
