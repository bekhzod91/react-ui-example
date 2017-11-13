import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui/styles/withStyles'
import LinearProgress from 'material-ui/Progress/LinearProgress'
import Divider from 'material-ui/Divider'

const styles = theme => ({
  root: {
    padding: '1px 0',
    backgroundColor: theme.table.backgroundColor
  },
  content: {
    padding: 10
  },
  progress: {
    height: 2
  },
})

const TableDetail = ({ classes, loading, children }) => {
  return (
    <div className={classes.root}>
      {loading && <LinearProgress className={classes.progress} />}
      {!loading && <div>
        <Divider />
        <div className={classes.content}>
          {children}
        </div>
      </div>}
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
