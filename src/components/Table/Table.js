import R from 'ramda'
import React from 'react'
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
    R.filter(item => R.equals(item.type, part)),
    R.head,
    item => item && React.cloneElement(item, props)
  )(children)
)

const Table = (props) => {
  const { classes, children, list, loading, selected, selector, detail, detailId } = props
  const selectIds = R.map(selector, list)
  const getHeader = cloneFromChildren(TableHeader, { selectIds, selected })
  const getRow = cloneFromChildren(TableRow, {
    list, loading, selected, selector, detailId, detail
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

Table.defaultProps = {
  selected: false
}

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  selector: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  detail: PropTypes.node,
  detailId: PropTypes.number,
}

export default withStyles(styles)(Table)
