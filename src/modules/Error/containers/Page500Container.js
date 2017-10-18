import * as R from 'ramda'
import { compose, mapProps } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Page500 from '../components/Page500'

const enhance = compose(
  connect(null, { push })
)

export default enhance(Page500)
