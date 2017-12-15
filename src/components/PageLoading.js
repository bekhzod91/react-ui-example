import React from 'react'
import PropTypes from 'prop-types'
import LinearProgress from 'material-ui/Progress/LinearProgress'
import withStyles from 'material-ui/styles/withStyles'

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

export default withStyles(styles)(PageLoading)
