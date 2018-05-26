import { find, equals } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { compose, pure, setDisplayName } from 'recompose'
import Checkbox from '@material-ui/core/Checkbox'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import { getSelectIdsFromRoute } from './helper'

const styles = theme => ({
  root: {},

  row: {
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px 4px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
    borderBottom: '1px solid #eee',
    transition: '0.4s',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.table.backgroundColor
  },

  content: {
    margin: '30px -10px'
  },

  header: {
    borderBottom: 'unset',
    backgroundColor: theme.palette.primary['300'],
  },
  checkboxHead: {
    color: '#fff !important'
  },

  checkbox: {
    marginRight: '5px',
    maxWidth: '100px !important'
  },
  cell: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  }
})

const enhance = compose(
  withRouter,
  withStyles(styles),
  pure,
  setDisplayName('TableRow')
)

const TableRow = ({ classes, content, ...props }) => {
  const isChecked = compose(
    Boolean,
    find(equals(parseInt(props.id))),
    getSelectIdsFromRoute
  )

  return (
    <div className={classNames(classes.root, { [classes.content]: content })}>
      {content || (
        <div className={classNames(classes.row, { [classes.header]: !props.isBody })}>
          {props.withCheckbox && (
            <div className={classes.checkbox}>
              {props.isBody ? (
                <Checkbox
                  onChange={(event, value) => props.onCheckItem({ value, id: props.id })}
                  checked={isChecked(props.history)}
                />
              ) : (
                <Checkbox
                  classes={{ root: classes.checkboxHead }}
                  onChange={(event, value) => props.onCheckAll(value)}
                  checked={props.fullyChecked}
                  indeterminate={props.partiallyChecked}
                />
              )}
            </div>
          )}
          <div className={classes.cell}>
            {props.children}
          </div>
        </div>
      )}
    </div>
  )
}

TableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  detail: PropTypes.object,
  history: PropTypes.object,
  id: PropTypes.string,
  isBody: PropTypes.bool,
  withCheckbox: PropTypes.bool.isRequired,
  partiallyChecked: PropTypes.bool,
  fullyChecked: PropTypes.bool,
  onCheckItem: PropTypes.func,
  onCheckAll: PropTypes.func,
  content: PropTypes.node,
}

export default enhance(TableRow)
