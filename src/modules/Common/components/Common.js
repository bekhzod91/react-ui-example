import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'
import * as ROUTE from '../../../constants/routes'
import withStyles from 'material-ui/styles/withStyles'
import CommonDetail from './CommonDetail'

const styles = theme => ({
  common: {
    backgroundColor: theme.common.bgColor.white
  },
  mainTitle: {
    backgroundColor: theme.palette.primary[500],
    padding: '1px 10px',
    '& h1': {
      color: theme.common.text.white
    }
  }
})

const Common = ({ appBar, classes }) => {
  return (
    <AppBar activeMenuName={ROUTE.COMMON} {...appBar}>
      <div className={classes.common}>
        <div className={classes.mainTitle}><h1>Settings</h1></div>
        <h3>Company</h3>
        <CommonDetail
          title="Company"
        />
      </div>
    </AppBar>
  )
}

Common.propTypes = {
  classes: PropTypes.object.isRequired,
  appBar: PropTypes.object.isRequired
}

export default withStyles(styles)(Common)
