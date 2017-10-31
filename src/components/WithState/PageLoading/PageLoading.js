import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, branch, renderNothing } from 'recompose'
import LinearProgress from 'material-ui-next/Progress/LinearProgress'
import withStyles from 'material-ui-next/styles/withStyles'

const styles = {
  root: {
    position: 'absolute',
    zIndex: 1200,
    top: 0,
    right: 0,
    height: 4,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
}

const PageLoading = ({ classes }) => (
  <LinearProgress className={classes.root} />
)

PageLoading.propTypes = {
  classes: PropTypes.object
}

const enhance = compose(
  connect(state => ({
    loading: R.path(['pageLoading', 'loading'], state)
  })),
  (render => (
    branch(render, renderNothing)
  ))(R.pipe(R.prop('loading'), R.not)),
  withStyles(styles)
)

export default enhance(PageLoading)
