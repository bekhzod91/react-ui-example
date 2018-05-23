import React from 'react'
import { compose, createEventHandler, componentFromStream, pure } from 'recompose'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { removeItemFromSelect } from '../../helpers/urls'
import { addParamsRoute } from '../../helpers/route'
import { getSelectIdsFromRoute, selectIdsIncludeAnyListIds, selectIdsIncludeListIds } from './helper'

const styles = theme => ({
  root: {
    padding: '3px 0 3px 0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.palette.primary['300'],
    color: theme.table.headerTextColor
  },
  checkbox: {
    marginRight: '5px'
  },
})

const enhance = compose(
  withRouter,
  withStyles(styles),
  pure
)

const getCheckedStatus = (history, ids) => {
  const selectIds = getSelectIdsFromRoute(history)
  const fullyChecked = selectIdsIncludeListIds(selectIds, ids)
  const partiallyChecked = fullyChecked ? false : selectIdsIncludeAnyListIds(selectIds, ids)

  return { partiallyChecked, fullyChecked }
}

const TableHeader = componentFromStream(props$ => {
  const { stream: onCheckAll$, handler: onCheckAll } = createEventHandler()

  onCheckAll$
    .withLatestFrom(props$)
    .subscribe(([checked, { history, ids }]) => {
      const { partiallyChecked } = getCheckedStatus(history, ids)

      if (checked && !partiallyChecked) {
        addParamsRoute({ 'select': ids.join(',') }, history)
      } else {
        const search = history.location.search
        const newIds = removeItemFromSelect(search, 'select', ids)

        addParamsRoute({ 'select': newIds }, history)
      }
    })

  return props$.combineLatest(props$, ({ classes, ...props }) => {
    const { partiallyChecked, fullyChecked } = getCheckedStatus(props.history, props.ids)

    return (
      <div className={classes.root}>
        {props.children &&
        React.cloneElement(props.children, {
          noBg: true,
          withCheckbox: props.withCheckbox,
          onCheckAll: onCheckAll,
          partiallyChecked,
          fullyChecked
        })}
      </div>
    )
  })
})

TableHeader.defaultProps = {
  fullyChecked: false
}
TableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
  withCheckbox: PropTypes.bool.isRequired,
  ids: PropTypes.array
}

export default enhance(TableHeader)
