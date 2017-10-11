import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui-next/IconButton'
import withStyles from 'material-ui-next/styles/withStyles'
import FileDownloadIcon from 'material-ui-icons/FileDownload'
import Menu, { MenuItem } from 'material-ui-next/Menu'
import More from '../../../components/More'

const styles = theme => ({
  root: {}
})

const CompanyListActions = ({ classes, ...props }) => (
  <div className={classes.root}>
    <IconButton>
      <More>
        <Menu onEnter={() => {}}>
          <MenuItem onClick={() => console.log('Work')}>
            <FileDownloadIcon /> Download CSV file
          </MenuItem>
          <MenuItem onClick={() => console.log('Work')}>
            Hello1
          </MenuItem>
        </Menu>
      </More>
    </IconButton>
  </div>
)

CompanyListActions.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompanyListActions)
