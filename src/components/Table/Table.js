import R from 'ramda'
import React from 'react'
import { compose, withHandlers, defaultProps } from 'recompose'
import PropTypes from 'prop-types'
import withStyles from 'material-ui-next/styles/withStyles'
import TableRow from './TableRow'
import TableHeader from './TableHeader'
import { appendParamsToUrl, addItemToSelect, removeItemFromSelect } from '../../helpers/urls'

const styles = theme => ({
  root: {
    width: '100%'
  },
  wall: {
    marginLeft: '10px',
    marginRight: '10px'
  },

  header: {
    backgroundColor: theme.table.backgroundColor
  },

  tableBody: {
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    height: '75px',
    backgroundColor: theme.table.backgroundColor
  }
})

const cloneFromChildren = R.curry((part, props, children) =>
  R.pipe(
    R.filter(R.whereEq({ type: part })),
    R.head,
    item => item && React.cloneElement(item, props)
  )(children)
)
const getSelectIdsFromProps = R.pipe(
  R.pathOr('', ['route', 'location', 'query', 'ids']),
  R.split(','),
  R.map(parseInt),
  R.filter(R.pipe(isNaN, R.not)),
  R.sort(R.gte)
)

const getIdsFromList = R.curry((getById, list) => R.pipe(
  R.pathOr([], ['data', 'results']),
  R.map(
    R.pipe(getById, parseInt)
  ),
  R.sort(R.gte)
)(list))

const selectIdsIncludeListIds = R.curry((selectIds, listIds) => R.equals(
  R.without(R.without(listIds, selectIds), selectIds),
  listIds
))

const Table = ({ classes, children, getById, list, detail, ...props }) => {
  const { handleCheckAll, handleCheckItem } = props
  const results = R.pathOr([], ['data', 'results'], list)
  const listIds = getIdsFromList(getById, list)
  const selectIds = getSelectIdsFromProps(props)
  const checkboxEnable = R.prop('checkboxEnable', props)
  const checkboxIsChecked = selectIdsIncludeListIds(selectIds, listIds)

  const getHeader = cloneFromChildren(TableHeader, { checkboxEnable, checkboxIsChecked, handleCheckAll })
  const getRow = cloneFromChildren(TableRow, {
    list: results, detail, checkboxEnable, selectIds, getById, handleCheckItem
  })

  return (
    <div className={classes.root}>
      <div className={classes.wall}>
        <div className={classes.tableBody}>
          {getHeader(children)}
          {getRow(children)}
        </div>
      </div>
    </div>
  )
}

const enhance = compose(
  defaultProps({
    getById: R.prop('id'),
    checkboxEnable: true
  }),
  withHandlers({
    handleCheckAll: ({ getById, route, list }) => (isChecked) => {
      const { push, location } = route
      const listIds = getIdsFromList(getById, list)
      const pathname = R.prop('pathname', location)
      const search = R.prop('search', location)
      const fullPath = `${pathname}${search}`

      if (isChecked) {
        return push(addItemToSelect(fullPath, 'ids', listIds))
      }

      return push(removeItemFromSelect(fullPath, 'ids', listIds))
    },
    handleCheckItem: ({ route }) => (isChecked, id) => {
      const { push, location } = route
      const pathname = R.prop('pathname', location)
      const search = R.prop('search', location)
      const fullPath = `${pathname}${search}`

      if (isChecked) {
        return push(addItemToSelect(fullPath, 'ids', id))
      }

      console.log(removeItemFromSelect(fullPath, 'ids', id), id)
      return push(removeItemFromSelect(fullPath, 'ids', id))
    }
  }),
  withStyles(styles)
)

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  list: PropTypes.object.isRequired,
  getById: PropTypes.func.isRequired,
  detail: PropTypes.shape({
    id: PropTypes.number,
    node: PropTypes.node,
  }),
  checkboxEnable: PropTypes.bool.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
  handleCheckItem: PropTypes.func.isRequired,
}

export default enhance(Table)
