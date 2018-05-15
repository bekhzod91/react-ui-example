import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Collapse from '@material-ui/core/Collapse'

const styles = theme => ({
  root: {
    backgroundColor: theme.table.backgroundColor
  },

  progress: {
    height: 2
  },

  collapse: {
    height: 0
  },

  collapseOpen: {
    height: 'auto',
  },

  entered: {
    overflow: 'visible'
  }
})

const TableDetail = ({ classes, loading, children }) => {
  return (
    <div className={classes.root}>
      {loading && <LinearProgress className={classes.progress} />}
      <Collapse
        in={!loading}
        classes={{
          entered: classes.entered,
          wrapper: classNames(
            classes.collapse, {
              [classes.collapseOpen]: !loading
            })
        }}>
        <div>
          <div className={classes.content}>
            {!loading && children}
          </div>
        </div>
      </Collapse>
    </div>
  )
}

TableDetail.defaultProps = {
  columnSize: 1
}

TableDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired
}

export default withStyles(styles)(TableDetail)
