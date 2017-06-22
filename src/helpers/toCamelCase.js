import _ from 'lodash'

const toCamelCase = (data) => {
  if (_.isArray(data)) {
    return _.map(data, (item) => toCamelCase(item))
  }

  if (_.isObject(data)) {
    return _
      .chain(data)
      .mapKeys((value, key) => _.camelCase(key))
      .mapValues((value) => toCamelCase(value))
      .value()
  }

  return data
}

export default toCamelCase
