import _ from 'lodash'
import flow from 'lodash/fp/flow'
import first from 'lodash/fp/first'
import filter from 'lodash/fp/filter'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
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
    height: '75px',
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

const Table = (props) => {
  const { classes, children, list, loading, selected, selector, detail, detailId } = props
  const tableHeader = flow(
    filter(item => item.type === TableHeader),
    first
  )(children)

  const tableRow = flow(
    filter(item => item.type === TableRow),
    first
  )(children)

  const selectIds = map(selector)(list)

  return (
    <div className={classes.root}>
      <div className={classes.wall}>
        <div className={classes.tableBody}>
          {tableHeader && React.cloneElement(tableHeader, { selectIds, selected })}
          {tableRow && React.cloneElement(tableRow, {
            list, loading, selected, selector, detailId, detail
          })}
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
