import { compose, not, path, prop } from 'ramda'
import { mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import * as STATES from '../../../constants/states'
import { getPermissionsAction } from '../actions/permissions'
import { getDataFromState } from '../../../helpers/get'

const mapStateToProps = state => ({
  permission: getDataFromState(STATES.PERMISSIONS, state),
  token: path([STATES.SING_IN, 'data', 'token'], state)
})

export default compose(
  connect(mapStateToProps, { getPermissionsAction }),
  mapPropsStream(props$ => {
    props$
      .filter(prop('token'))
      .distinctUntilChanged(null, prop('token'))
      .filter(compose(not, path(['permission', 'data'])))
      .subscribe(props => props.getPermissionsAction())

    return props$
  })
)
