import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import SettingsIcon from 'material-ui-icons/Settings'
import BusinessIcon from 'material-ui-icons/Business'
import Grid from '@material-ui/core/Grid'
import * as ROUTES from '../../../constants/routes'
import AppBar from '../../../components/AppBar'
import SettingsIconItem from './SettingsItem'

const styles = theme => ({
  root: {
    boxShadow: theme.shadows[2],
    paddingBottom: 30,
    backgroundColor: theme.common.bgColor.white
  },
  header: {
    background: theme.palette.primary[500],
    color: '#fff',
    padding: 15,
    '& h2': {
      color: theme.common.text.white,
      margin: 0,
    }
  },
  wrapper: {
  },
  title: {
    backgroundColor: theme.palette.primary[400],
    padding: '1px 15px',
    '& h4': {
      color: theme.common.text.white,
      margin: '10px 0'
    }
  },
  titleIcon: {
    verticalAlign: 'middle',
    width: 20,
    height: 20
  },
  body: {
    padding: 15,
    '& h3': {
      marginTop: 0
    }
  },
  icon: {
    width: 54,
    height: 54,
    verticalAlign: 'middle',
    margin: '0 10px 0 5px'
  }
})

const SPACE_BETWEEN_SETTINGS_ITEM = 24

const Settings = ({ classes }) => {
  const description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
  return (
    <AppBar activeMenuName={ROUTES.COMMON_SETTINGS}>
      <div className={classes.root}>
        <div className={classes.header}>
          <h2>Settings <SettingsIcon className={classes.titleIcon} /></h2>
        </div>
        {[1, 2, 3, 4, 5].map((value) => (
          <div className={classes.wrapper}>
            <div className={classes.title}>
              <h4>Settings <SettingsIcon className={classes.titleIcon} /></h4>
            </div>
            <div className={classes.body}>
              <Grid container={true} spacing={SPACE_BETWEEN_SETTINGS_ITEM}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Grid key={value} item={true} sm={3}>
                    <SettingsIconItem
                      title="Company"
                      description={description}
                      icon={(<BusinessIcon className={classes.icon} />)}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        ))}
      </div>
    </AppBar>
  )
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Settings)
