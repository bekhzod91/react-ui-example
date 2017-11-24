import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'
import * as ROUTE from '../../../constants/routes'
import withStyles from 'material-ui/styles/withStyles'
import SettingsIcon from 'material-ui-icons/Settings'
import BusinessIcon from 'material-ui-icons/Business'
import SettingsIconItem from './SettingsItem'
import Grid from 'material-ui/Grid'

const styles = theme => ({
  root: {
    backgroundColor: theme.common.bgColor.white,
    boxShadow: theme.shadows[2],
    paddingBottom: 30
  },
  mainTitle: {
    backgroundColor: theme.palette.primary[500],
    padding: '1px 15px',
    '& h2': {
      color: theme.common.text.white,
      margin: '10px 0'
    }
  },
  mainBody: {
    padding: 15,
    '& h3': {
      marginTop: 0
    }
  },
  icon: {
    verticalAlign: 'middle',
    width: 20,
    height: 20
  },
  itemIcon: {
    width: 54,
    height: 54,
    verticalAlign: 'middle',
    margin: '0 15px'
  }
})

const SPACE_BETWEEN_SETTINGS_ITEM = 24

const Settings = ({ appBar, classes }) => {
  const description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
  return (
    <AppBar activeMenuName={ROUTE.COMMON_SETTINGS} {...appBar}>
      <div className={classes.root}>
        <div className={classes.mainTitle}>
          <h2>Settings <SettingsIcon className={classes.icon} /></h2>
        </div>
        <div className={classes.mainBody}>
          <h3>Settings <SettingsIcon className={classes.icon} /></h3>
          <Grid container={true} spacing={SPACE_BETWEEN_SETTINGS_ITEM}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Grid key={value} item={true} sm={3}>
                <SettingsIconItem
                  title="Company"
                  description={description}
                  icon={(<BusinessIcon className={classes.itemIcon} />)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.mainBody}>
          <h3>Settings <SettingsIcon className={classes.icon} /></h3>
          <Grid container={true} spacing={SPACE_BETWEEN_SETTINGS_ITEM}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Grid key={value} item={true} sm={3}>
                <SettingsIconItem
                  title="Company"
                  description={description}
                  icon={(<BusinessIcon className={classes.itemIcon} />)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.mainBody}>
          <h3>Settings <SettingsIcon className={classes.icon} /></h3>
          <Grid container={true} spacing={SPACE_BETWEEN_SETTINGS_ITEM}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Grid key={value} item={true} sm={3}>
                <SettingsIconItem
                  title="Company"
                  description={description}
                  icon={(<BusinessIcon className={classes.itemIcon} />)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </AppBar>
  )
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  appBar: PropTypes.object.isRequired
}

export default withStyles(styles)(Settings)
