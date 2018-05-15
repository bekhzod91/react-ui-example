import {
  compose, curry, fromPairs, has, is, isEmpty, isNil, join, keys, map,
  reduce, slice, split, startsWith, toPairs, merge, pathOr, pick, prop,
  chain
} from 'ramda'
import moment from 'moment'
import { parseParams } from './urls'
import { toSnake } from './toSnakeCase'

export const getFormValueFromState = curry((name, state) => pathOr({}, ['form', name, 'values'], state))
export const getFormValuesLikeParams = map((item) => {
  if (isNil(item) || isEmpty(item)) {
    return ''
  }

  if (is(Array, item)) {
    return `list:${join(',', getFormValuesLikeParams(item))}`
  }

  if (moment.isMoment(item)) {
    return `date:${item.format('X')}`
  }

  if (is(Object, item) && has('startDate', item) && has('endDate', item)) {
    return `d2d:${item['startDate'].format('X')}-${item['endDate'].format('X')}`
  }

  if (is(Object, item) && prop('id', item)) {
    return `obj:${prop('id', item)}`
  }

  if (is(Number, item)) {
    return `num:${item}`
  }

  if (is(String, item)) {
    return `str:${item}`
  }

  return item
})

const fromMoment = compose((val) => moment(val, 'X'), parseInt)
export const parseUrlParams = (param) => {
  if (startsWith('list:', param)) {
    return compose(
      map(parseUrlParams),
      split(','),
      slice(5, Infinity)
    )(param)
  }

  if (startsWith('str:', param)) {
    return slice(4, Infinity, param)
  }

  if (startsWith('num:', param)) {
    return parseFloat(slice(4, Infinity, param))
  }

  if (startsWith('obj:', param)) {
    return { id: parseInt(slice(4, Infinity, param)) }
  }

  if (startsWith('date:', param)) {
    return fromMoment(param)
  }

  if (startsWith('d2d:', param)) {
    const [startDate, endDate] = compose(map(fromMoment), split('-'), slice(4, Infinity))(param)
    return { startDate, endDate }
  }

  return param
}
export const getParamsLikeFormValues = curry((fields, params) => compose(
  map(parseUrlParams),
  pick(fields),
)(params))

export const getInitialFormValuesFromProps = curry((name, state, props) => {
  const fields = keys(pathOr({}, ['form', name, 'registeredFields'], state))
  const params = parseParams(pathOr('', ['location', 'search'], props)) || {}

  return getParamsLikeFormValues(fields, params)
})

const renameKeys = {
  rowsPerPage: 'page_size',
  sort: 'ordering'
}

export const mapValue = ([key, value]) => {
  if (moment.isMoment(value)) return [key, moment(value).format('YYYY-MM-DD')]
  if (is(Array, value)) return [key, map(prop('id'), value)]
  if (is(Object, value) && has('id', value)) return [key, prop('id', value)]

  return [key, value]
}

export const mapD2D = ([key, value]) => {
  const startDate = prop('startDate', value)
  const endDate = prop('endDate', value)

  if (is(Object, value) &&
    startDate && moment.isMoment(startDate) &&
    endDate && moment.isMoment(endDate)) {
    return [[`${key}_0`, startDate.format('YYYY-MM-DD')], [`${key}_1`, endDate.format('YYYY-MM-DD')]]
  }

  return [[key, value]]
}

export const orderingToSnake = ([key, value]) => {
  if (key === 'ordering') {
    const snakeValue = compose(join(','), map(toSnake), split(','))(value)
    return [key, snakeValue]
  }

  return [key, value]
}

export const serializer = (...args) => compose(
  fromPairs,
  map(item => has(item[0], renameKeys) ? [[renameKeys[item[0]]], item[1]] : [[toSnake(item[0])], item[1]]),
  map(mapValue),
  chain(mapD2D),
  map(orderingToSnake),
  toPairs,
  reduce(merge, {})
)(args)
