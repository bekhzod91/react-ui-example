import {
  compose,
  map,
  toLower,
  has,
  chain,
  toPairs,
  fromPairs, merge, reduce, join, prop, is, split, tryCatch, always
} from 'ramda'
import moment from 'moment/moment'
import { toSnake } from './toSnakeCase'

export const mapStrToBoolean = str => toLower(str) === 'true'

const decodeURLParam = compose(tryCatch(JSON.parse, always(undefined)), decodeURIComponent)
export const decodeURLParams = map(decodeURLParam)

const encodeURLParam = compose(encodeURIComponent, JSON.stringify)
export const encodeURLParams = map(encodeURLParam)

const renameKeys = {
  rowsPerPage: 'page_size',
  sort: 'ordering'
}

const mapValue = ([key, value]) => {
  if (moment.isMoment(value)) return [key, moment(value).format('YYYY-MM-DD')]
  if (is(Array, value)) return [key, map(prop('id'), value)]
  if (is(Object, value) && has('id', value)) return [key, prop('id', value)]

  return [key, value]
}

const mapD2D = ([key, value]) => {
  const startDate = prop('startDate', value)
  const endDate = prop('endDate', value)

  if (is(Object, value) &&
    startDate && moment.isMoment(startDate) &&
    endDate && moment.isMoment(endDate)) {
    return [[`${key}_0`, startDate.format('YYYY-MM-DD')], [`${key}_1`, endDate.format('YYYY-MM-DD')]]
  }

  return [[key, value]]
}

const orderingToSnake = ([key, value]) => {
  if (key === 'ordering') {
    const snakeValue = compose(join(','), map(toSnake), split(','))(value)
    return [key, snakeValue]
  }

  return [key, value]
}

export const mapParamsToRequest = (...args) => compose(
  fromPairs,
  map(item => has(item[0], renameKeys) ? [[renameKeys[item[0]]], item[1]] : [[toSnake(item[0])], item[1]]),
  map(mapValue),
  chain(mapD2D),
  map(orderingToSnake),
  toPairs,
  reduce(merge, {})
)(args)
