import * as R from 'ramda'
import React from 'react'
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

const enhance = compose(
  connect(state => ({
    loading: R.path(['pageLoading', 'loading'], state)
  })),
  (render => (
    branch(render, renderNothing)
  ))(R.pipe(R.prop('loading'), R.not))
)

export default enhance(PageLoading)
