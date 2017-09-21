import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Checkbox from 'material-ui-next/Checkbox'
import withStyles from 'material-ui-next/styles/withStyles'

const styles = theme => ({
  root: {

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
    margin: '50px -20px 50px -20px'
  }
})

const TableRow = ({ classes, children, list, checkboxEnable, selector, detail, detailId }) => {
  const rows = _.map(list, (item, index) => {
    const active = selector(item) === detailId
    const column = _.map(children, (chItem, chIndex) => {
      return React.cloneElement(chItem, { item, index, key: chIndex })
    })

    return (
      <div
        key={index}
        className={classNames(classes.root, {
          [classes.detail]: active
        })}>
        <div className={classes.column}>
          {checkboxEnable && (
            <div className={classes.checkbox}>
              <Checkbox />
            </div>
          )}
          {column}
        </div>
        {active && detail}
      </div>
    )
  })

  return (
    <div>
      {rows}
    </div>
  )
}

TableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  checkboxEnable: PropTypes.bool.isRequired,
  children: PropTypes.node,
  selector: PropTypes.func,
  detailId: PropTypes.any,
  detail: PropTypes.node,
  list: PropTypes.array.isRequired
}

export default withStyles(styles)(TableRow)
