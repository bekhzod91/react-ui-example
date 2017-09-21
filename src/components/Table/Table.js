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

const Table = ({ classes, children, list, detail, ...props }) => {
  const location = R.path(['route', 'location'], props)
  const checkboxEnable = R.prop('checkboxEnable', props)
  const checkedIds = R.pipe(R.split(','), R.map(parseInt))
  const listIds = R.map(R.pipe(R.prop('id'), parseInt))
  const getHeader = cloneFromChildren(TableHeader, { checkboxEnable })
  const getRow = cloneFromChildren(TableRow, { list, detail, checkboxEnable })

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
    }
  }),
  withStyles(styles)
)

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  list: PropTypes.arrayOf({
    id: PropTypes.number
  }).isRequired,
  detail: PropTypes.shape({
    id: PropTypes.number,
    loading: PropTypes.bool,
    data: PropTypes.shape({
      count: PropTypes.number,
      results: PropTypes.array
    })
  }).isRequired,
  selector: PropTypes.func.isRequired,
  checkboxEnable: PropTypes.bool.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
}

export default enhance(Table)
