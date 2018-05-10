import { compose, not, prop } from 'ramda'
import { mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../../constants/state'
import { getPermissionsAction } from '../actions/permissions'
import { getDataFromState } from '../../../helpers/get'

const mapStateToProps = (state) => ({
  permission: getDataFromState(STATE.USER_PERMISSION, state)
})

export default compose(
  connect(mapStateToProps, { getPermissionsAction }),
  mapPropsStream(props$ => {
    props$
      .first()
      .filter(compose(not, prop('permissions')))
      .flatMap(props => props.getPermissionsAction())

    return props$
  })
)
