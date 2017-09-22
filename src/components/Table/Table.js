import R from 'ramda'
import React from 'react'
import { compose, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import withStyles from 'material-ui-next/styles/withStyles'
import TableRow from './TableRow'
import TableHeader from './TableHeader'

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

const getIdsFromList = R.pipe(
  R.pathOr([], ['data', 'results']),
  R.map(
    R.pipe(R.prop('id'), parseInt)
  ),
  R.sort(R.gte)
)

const selectIdsIncludeListIds = R.curry((selectIds, listIds) => R.equals(
  R.without(selectIds, R.without(selectIds, listIds)),
  listIds
))

const Table = ({ classes, children, list, detail, ...props }) => {
  const { handleCheckAll, handleCheckItem } = props
  const results = R.pathOr([], ['data', 'results'], list)
  const listIds = getIdsFromList(list)
  const selectIds = getSelectIdsFromProps(props)
  const checkboxEnable = R.prop('checkboxEnable', props)
  const checkboxIsChecked = selectIdsIncludeListIds(selectIds, listIds)

  const getHeader = cloneFromChildren(TableHeader, { checkboxEnable, checkboxIsChecked, handleCheckAll })
  const getRow = cloneFromChildren(TableRow, { list: results, detail, checkboxEnable, handleCheckItem })

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

Table.defaultProps = {
  checkboxEnable: true
}

const enhance = compose(
  withHandlers({
    handleCheckAll: props => (event, value) => {
      const { selector, list } = props
      const selectIds = R.map(selector, list)
      console.log(value, selectIds)
    },
    handleCheckItem: props => (id, isChecked) => {
      console.log(id, isChecked)
    }
  }),
  withStyles(styles)
)

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  list: PropTypes.object.isRequired,
  detail: PropTypes.shape({
    id: PropTypes.number,
    loading: PropTypes.bool,
    data: PropTypes.shape({
      count: PropTypes.number,
      results: PropTypes.array
    })
  }).isRequired,
  checkboxEnable: PropTypes.bool.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
  handleCheckItem: PropTypes.func.isRequired,
}

export default enhance(Table)
