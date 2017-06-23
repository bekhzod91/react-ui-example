import _ from 'lodash'

export const toSnakeCaseOrdering = (ordering) => {
  return _
    .chain(ordering)
    .split(',')
    .map((item) => {
      const trans = _.chain(item).split('.').map(_.snakeCase).join('__')
      return _.startsWith(item, '-') ? '-' + trans : trans
    })
    .join(',')
    .value()
}

export default toSnakeCaseOrdering
