import _ from 'lodash'
import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../../constants/state'
import { getPermissionsAction } from '../actions/permissions'

const mapStateToProps = (state) => ({
  loading: _.get(state, [STATE.USER_PROFILE, 'loading'])
})

export default compose(
  connect(mapStateToProps, { getPermissionsAction }),
  mapPropsStream((props$) => {
    props$
      .filter((props) => props.params.id)
      .distinctUntilChanged(null, (props) => props.params.id)
      .subscribe((props) => {
        props.getPermissionsAction(props.params.id)
      })

    return props$
  })
)
