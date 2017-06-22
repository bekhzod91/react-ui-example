import _ from 'lodash'
import sprintf from 'sprintf'

const filter = (data, pathname, query = {}) => {
  const params = query
  const first = 1
  const defaultPageRange = 10
  const currentPage = _.toInteger(_.get(params, 'page') || first)
  const pageRange = _.toInteger(_.get(params, 'pageSize') || defaultPageRange)
  const itemsCount = _.get(data, 'count')

  const pageCount = Math.ceil(itemsCount / pageRange)

  const getParam = (paramName) => _.get(params, paramName)

  const getParams = (newParams) => _.assign({}, params, newParams)

  const getSelects = () => {
    return _
      .chain(getParam('select'))
      .split(',')
      .filter(item => item)
      .map((item) => _.toInteger(item))
      .value()
  }

  const paramsToQueryUrl = (paramsItems) => {
    if (_.isEmpty(paramsItems)) {
      return null
    }

    const url = _
      .chain(paramsItems)
      .keys()
      .map((key) => {
        return {
          key: key,
          value: paramsItems[key]
        }
      })
      .filter((item) => !_.isEmpty(item.value) || _.isNumber(item.value))
      .map((item) => {
        return sprintf('%s=%s', item.key, encodeURIComponent(item.value))
      })
      .reduce((result, item) => {
        return sprintf('%s&%s', result, item)
      })
      .value()

    return url ? '?' + url : null
  }

  const createURL = (newParams) => {
    const queryUrl = paramsToQueryUrl(_.assign({}, params, newParams))
    return queryUrl ? pathname + queryUrl : pathname
  }

  const prevPage = () => {
    const prevPageNumber = currentPage - first
    if (currentPage <= first) {
      return null
    }

    return createURL({ page: prevPageNumber })
  }

  const nextPage = () => {
    const nextPageNumber = currentPage + first
    if (pageCount < nextPageNumber) {
      return null
    }
    return createURL({ page: nextPageNumber })
  }

  const getSortingType = (columnSortingName) => {
    const currentOrdering = _.get(params, 'ordering')

    const columnType = _
      .chain(currentOrdering)
      .split(',')
      .filter((item) => !_.isEmpty(item))
      .map((column) => ({ column: _.trimStart(column, '-'), desc: _.startsWith(column, '-') }))
      .find({ column: columnSortingName })
      .get('desc')
      .value()

    return _.isUndefined(columnType) ? null : columnType
  }

  const sortingURL = (columnSortingName) => {
    const currentOrdering = _.get(params, 'ordering')
    const columnList = _
      .chain(currentOrdering)
      .split(',')
      .filter((item) => !_.isEmpty(item))
      .map((column) => ({ column: _.trimStart(column, '-'), desc: _.startsWith(column, '-') }))
      .value()

    const columnSortingType = _
      .chain(columnList)
      .find({ column: columnSortingName })
      .get('desc')
      .value()

    const columnSortingDesc = _.isUndefined(columnSortingType) ? false : (columnSortingType ? null : true)

    const ordering = _
      .chain(columnList)
      .filter((item) => item.column !== columnSortingName)
      .union([{ column: columnSortingName, desc: columnSortingDesc }])
      .filter((item) => !_.isNull(_.get(item, 'desc')))
      .map((item) => {
        return _.get(item, 'desc') ? '-' + _.get(item, 'column') : _.get(item, 'column')
      })
      .join(',')
      .value()

    return createURL({ ordering })
  }

  const getCounts = () => itemsCount

  const getPageRange = () => pageRange

  const getCurrentPage = () => currentPage

  const pageItemList = () => _.range(first, pageCount + first)

  const hasPagination = () => pageCount > first

  const filterRequest = () => {
    return paramsToQueryUrl(_.assign({}, params))
  }

  const filterBy = (newParams) => ({
    pathname,
    query: {
      ...params,
      page: first,
      ...newParams
    }
  })

  return {
    getParam,
    getParams,
    getCounts,
    getPageRange,
    getCurrentPage,
    getSortingType,
    getSelects,
    sortingURL,
    filterBy,
    filterRequest,
    createURL,
    prevPage,
    nextPage,
    pageItemList,
    hasPagination
  }
}

export default filter
