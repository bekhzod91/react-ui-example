import { compose, path, assoc, __ } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import withStyles from '@material-ui/core/styles/withStyles'

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

const PageLoading = ({ classes, loading }) => {
  if (loading) {
    return <LinearProgress className={classes.root} />
  }

  return null
}

PageLoading.propTypes = {
  classes: PropTypes.object,
  loading: PropTypes.bool,
}

const enhance = compose(
  connect(compose(
    assoc('loading', __, {}),
    path(['pageLoading', 'loading'])
  )),
  withStyles(styles)
)

export default enhance(PageLoading)
