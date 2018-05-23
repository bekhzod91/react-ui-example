import { find, equals } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { compose } from 'recompose'
import Checkbox from '@material-ui/core/Checkbox'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom'
import { getSelectIdsFromRoute } from './helper'

const styles = theme => ({
  root: {
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px 4px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
    borderBottom: '2px solid #eee',
    transition: '0.4s',
    width: '100%',
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
    marginRight: '5px',
    maxWidth: '100px !important'
  },
  checked: {
    color: '#fff !important'
  },
  unChecked: {
    color: '#fff'
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.table.backgroundColor
  },
  noBackground: {
    boxShadow: 'unset',
    borderBottom: 'unset',
    '& > div': {
      backgroundColor: 'transparent'
    }
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

const enhance = compose(
  withRouter,
  withStyles(styles)
)

const TableRow = ({ classes, ...props }) => {
  const selectIds = getSelectIdsFromRoute(props.history)
  const checked = find(equals(parseInt(props.id)), selectIds)

  //  const detailNode = prop('detail', detail)
  //  const detailId = prop('id', detail)
  // console.warn(children)
  //   const rows = mapWithIndex((item, index) => {
  //     const id = getById(item)
  //     const active = equals(id, detailId)
  //     const beforeActive = equals(getById(path([index + 1], list)), detailId)
  //     const afterActive = equals(getById(path([index - 1], list)), detailId)
  //     const column = renderColumn(item, index, children)
  //     const className = classNames(classes.root, {
  //       [classes.detail]: active,
  //       [classes.beforeActive]: beforeActive,
  //       [classes.afterActive]: afterActive,
  //     })
  //     const checked = pipe(
  //       filter((item) => item === id),
  //       isEmpty,
  //       not
  //     )(selectIds)
  //
  //     return (
  //       <div key={index} className={className}>
  //         <div className={classes.column}>
  //           {checkboxEnable && (
  //             <div className={classes.checkbox}>
  // {/*              <Checkbox onChange={(event, value) => onCheckItem(value, id)} checked={checked} />*/}
  //             </div>
  //           )}
  //           {column}
  //         </div>
  //         {active && detailNode}
  //       </div>
  //     )
  //   }, list)

  return (
    <div className={classNames(classes.root, { [classes.noBackground]: props.noBg })}>
      <div className={classes.column}>
        {props.withCheckbox && (
          <Grid item={true} xs="1" className={classes.checkbox}>
            {props.isBody ? (
              <Checkbox
                onChange={(event, value) => props.onCheckItem(value, props.id)}
                checked={checked}
              />
            ) : (
              <Checkbox
                classes={{
                  checked: classes.checked
                }}
                onChange={(event, value) => !props.partiallyChecked && value
                  ? props.onCheckAll() : props.onUnCheckAll()}
                checked={props.fullyChecked}
                indeterminate={props.partiallyChecked}
              />
            )}
          </Grid>
        )}
        {props.children}
      </div>
    </div>
  )
}

TableRow.defaultProps = {
  noBg: false
}

TableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  detail: PropTypes.object,
  noBg: PropTypes.bool,
  history: PropTypes.bool,
  id: PropTypes.string,
  isBody: PropTypes.bool,
  withCheckbox: PropTypes.bool.isRequired,
  partiallyChecked: PropTypes.bool,
  fullyChecked: PropTypes.bool,
  onCheckItem: PropTypes.func,
  onCheckAll: PropTypes.func,
  onUnCheckAll: PropTypes.func
}

export default enhance(TableRow)
