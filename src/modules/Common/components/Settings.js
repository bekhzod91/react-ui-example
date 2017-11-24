import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'
import * as ROUTE from '../../../constants/routes'
import withStyles from 'material-ui/styles/withStyles'
import Settings from 'material-ui-icons/Settings'
import Business from 'material-ui-icons/Business'
import SettingsItem from './SettingsItem'
import Grid from 'material-ui/Grid'

const styles = theme => ({
  common: {
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

const SPACE_BETWEEN_SETTINGS_ITEM = '24'

const CommonSettings = ({ appBar, classes }) => {
  const description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
  return (
    <AppBar activeMenuName={ROUTE.COMMON} {...appBar}>
      <div className={classes.common}>
        <div className={classes.mainTitle}>
          <h2>Settings <Settings className={classes.icon} /></h2>
        </div>
        <div className={classes.mainBody}>
          <h3>Settings <Settings className={classes.icon} /></h3>
          <Grid container={true} spacing={SPACE_BETWEEN_SETTINGS_ITEM}>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.mainBody}>
          <h3>Settings <Settings className={classes.icon} /></h3>
          <Grid container={true} spacing={SPACE_BETWEEN_SETTINGS_ITEM}>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.mainBody}>
          <h3>Settings <Settings className={classes.icon} /></h3>
          <Grid container={true} spacing={SPACE_BETWEEN_SETTINGS_ITEM}>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
            <Grid item={true} sm={3}>
              <SettingsItem
                title="Company"
                description={description}
                icon={(<Business className={classes.itemIcon} />)}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </AppBar>
  )
}

CommonSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  appBar: PropTypes.object.isRequired
}

export default withStyles(styles)(CommonSettings)
