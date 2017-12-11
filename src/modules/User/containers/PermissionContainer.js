import { path } from 'ramda'
import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../../constants/state'
import { getPermissionsAction } from '../actions/permissions'
import { getDataFromState } from '../../../helpers/get'

const mapStateToProps = (state) => ({
  permission: getDataFromState(STATE.USER_PERMISSION, state)
})

export default compose(
  connect(mapStateToProps, { getPermissionsAction }),
  mapPropsStream((props$) => {
    props$
      .filter((props) => path(['params', 'companyId'], props))
      .distinctUntilChanged(null, (props) => path(['params', 'companyId'], props))
      .subscribe((props) => {
        props.getPermissionsAction(path(['params', 'companyId'], props))
      })

    return props$
  })
)
