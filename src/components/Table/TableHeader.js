import React from 'react'
import { compose, withHandlers } from 'recompose'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { removeItemFromSelect } from '../../helpers/urls'
import { addParamsRoute } from '../../helpers/route'
import { getSelectIdsFromRoute, selectIdsIncludeAnyListIds, selectIdsIncludeListIds} from './helper'

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
  withHandlers({
    onCheckAll: ({ history, ids }) => () => {
      addParamsRoute({ 'select': ids.join(',') }, history)
    },
    onUnCheckAll: ({ history, ids }) => () => {
      const search = history.location.search
      const newIds = removeItemFromSelect(search, 'select', ids)

      addParamsRoute({ 'select': newIds }, history)
    },
  })
)

const TableHeader = ({ classes, ...props }) => {
  const selectIds = getSelectIdsFromRoute(props.history)
  const fullyChecked = selectIdsIncludeListIds(selectIds, props.ids)
  const partiallyChecked = fullyChecked ? false : selectIdsIncludeAnyListIds(selectIds, props.ids)

  return (
    <div className={classes.root}>
      {props.children &&
      React.cloneElement(props.children, {
        noBg: true,
        fullyChecked,
        partiallyChecked,
        withCheckbox: props.withCheckbox,
        onUnCheckAll: props.onUnCheckAll,
        onCheckAll: props.onCheckAll
      })}
    </div>
  )
}

TableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
  route: PropTypes.shape({
    companyId: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired,
  withCheckbox: PropTypes.bool.isRequired,
  checkboxMinusChecked: PropTypes.bool.isRequired,
  checkboxIsChecked: PropTypes.bool.isRequired,
  onCheckAll: PropTypes.func.isRequired,
  onUnCheckAll: PropTypes.func.isRequired,
  history: PropTypes.object,
  ids: PropTypes.array
}

export default enhance(TableHeader)
