import _ from 'lodash'
import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../../constants/state'
import { getPermissionsAction } from '../actions/permissions'

const mapStateToProps = (state) => ({
  loading: _.get(state, [STATE.USER_PERMISSION, 'loading'])
})

export default compose(
  connect(mapStateToProps, { getPermissionsAction }),
  mapPropsStream((props$) => {
    props$
      .filter((props) => _.get(props, ['params', 'companyId']))
      .distinctUntilChanged(null, (props) => _.get(props, ['params', 'companyId']))
      .subscribe((props) => {
        props.getPermissionsAction(_.get(props, ['params', 'companyId']))
      })

    return props$
  })
)
