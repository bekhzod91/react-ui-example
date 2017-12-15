import { path } from 'ramda'
import { compose as flow, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../../constants/state'
import { getPermissionsAction } from '../actions/permissions'
import { getDataFromState, getCompanyIdFromProps } from '../../../helpers/get'

const mapStateToProps = (state) => ({
  permission: getDataFromState(STATE.USER_PERMISSION, state)
})

export default flow(
  connect(mapStateToProps, { getPermissionsAction }),
  mapPropsStream((props$) => {
    props$
      .filter((props) => path(['match', 'params', 'companyId'], props))
      .distinctUntilChanged(null, (props) => path(['match', 'params', 'companyId'], props))
      .subscribe((props) => props.getPermissionsAction(getCompanyIdFromProps(props)))

    return props$
  })
)
