import _ from 'lodash'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { setTokenAction, clearTokenAction } from '../actions/token'
import * as STATE from '../../../constants/state'

const mapStateToProps = (state) => ({
  token: _.get(state, [STATE.SING_IN, 'data', 'token'])
})

export default compose(
  connect(mapStateToProps, {
    setTokenAction,
    clearTokenAction
  })
)
