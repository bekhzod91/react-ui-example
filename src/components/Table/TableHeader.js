import React from 'react'
import { compose, pure, setDisplayName, createEventHandler, componentFromStream } from 'recompose'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { removeItemFromSelect } from '../../helpers/urls'
import { addParamsRoute } from '../../helpers/route'
import { CHECKBOX_PARAM } from './constant'
import {
  getSelectIdsFromRoute,
  selectIdsIncludeAnyListIds,
  selectIdsIncludeListIds
} from './helper'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.table.headerTextColor,
    '& span': {
      textTransform: 'uppercase'
    }
  },
  checkbox: {
    marginRight: '5px'
  },
})

const enhance = compose(
  withRouter,
  withStyles(styles),
  pure,
  setDisplayName('TableHeader')
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
        addParamsRoute({ [CHECKBOX_PARAM]: ids.join(',') }, history)
      } else {
        const search = history.location.search
        const newIds = removeItemFromSelect(search, CHECKBOX_PARAM, ids)

        addParamsRoute({ [CHECKBOX_PARAM]: newIds }, history)
      }
    })

  return props$.combineLatest(props$, ({ classes, ...props }) => {
    const { partiallyChecked, fullyChecked } = getCheckedStatus(props.history, props.ids)

    return (
      <div className={classes.root}>
        {props.children && React.cloneElement(props.children, {
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
