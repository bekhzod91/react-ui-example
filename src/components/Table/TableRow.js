import { curry, addIndex, map, filter, isEmpty, prop, equals, path, pipe, not } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Checkbox from '@material-ui/core/Checkbox'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px 4px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
    borderBottom: '2px solid #eee',
    transition: '0.4s'
  },
  beforeActive: {
    borderBottom: 'none'
  },
  afterActive: {
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px -1px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
  },
  checkbox: {
    marginRight: '5px'
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.table.backgroundColor
  },

  progress: {
    height: 2
  },

  detail: {
    margin: '50px -20px',
    border: 'none',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px -1px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)'
  }
})

const mapWithIndex = addIndex(map)
const renderColumn = curry((item, index, children) => mapWithIndex((chItem, chIndex) =>
  React.cloneElement(chItem, { item, index, key: chIndex }), children
))

const TableRow = ({ classes, children, list, getById, selectIds, checkboxEnable, detail, onCheckItem }) => {
  const detailNode = prop('detail', detail)
  const detailId = prop('id', detail)
  const rows = mapWithIndex((item, index) => {
    const id = getById(item)
    const active = equals(id, detailId)
    const beforeActive = equals(getById(path([index + 1], list)), detailId)
    const afterActive = equals(getById(path([index - 1], list)), detailId)
    const column = renderColumn(item, index, children)
    const className = classNames(classes.root, {
      [classes.detail]: active,
      [classes.beforeActive]: beforeActive,
      [classes.afterActive]: afterActive,
    })
    const checked = pipe(
      filter((item) => item === id),
      isEmpty,
      not
    )(selectIds)

    return (
      <div key={index} className={className}>
        <div className={classes.column}>
          {checkboxEnable && (
            <div className={classes.checkbox}>
              <Checkbox onChange={(event, value) => onCheckItem(value, id)} checked={checked} />
            </div>
          )}
          {column}
        </div>
        {active && detailNode}
      </div>
    )
  }, list)

  return (
    <div>
      {rows}
    </div>
  )
}

TableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  getById: PropTypes.func.isRequired,
  onCheckItem: PropTypes.func.isRequired,
  checkboxEnable: PropTypes.bool.isRequired,
  children: PropTypes.node,
  detail: PropTypes.object,
  list: PropTypes.array.isRequired,
  selectIds: PropTypes.array,
}

export default withStyles(styles)(TableRow)
