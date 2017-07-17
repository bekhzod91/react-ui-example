import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, branch, renderNothing } from 'recompose'
import LinearProgress from 'material-ui/LinearProgress'

const styles = {
  linear: {
    position: 'absolute',
    zIndex: 9,
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
}

const PageLoading = () => (
  <LinearProgress style={styles.linear} />
)

PageLoading.propTypes = {
  loading: PropTypes.bool.isRequired
}

const enhance = compose(
  connect(state => ({
    loading: _.get(state, ['pageLoading', 'loading'])
  })),
  (render => (
    branch(render, renderNothing)
  ))(props => !_.get(props, 'loading'))
)

export default enhance(PageLoading)
