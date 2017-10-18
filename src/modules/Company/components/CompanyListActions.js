import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui-next/styles/withStyles'
import Menu, { MenuItem } from 'material-ui-next/Menu'
import Badge from 'material-ui-next/Badge'
import IconButton from 'material-ui-next/IconButton'
import FilterListIcon from 'material-ui-icons/FilterList'
import PdfIcon from '../../../components/Icon/PdfIcon'
import ExcelIcon from '../../../components/Icon/ExcelIcon'
import More from '../../../components/More'

const styles = theme => ({
  root: {
    display: 'inline-flex'
  },
  menu: {
    '& svg': {
      marginRight: 10,
      color: theme.palette.secondary[500]
    }
  }
})

const CompanyListActions = ({ classes, onOpenFilter, ...props }) => (
  <div className={classes.root}>
    <IconButton onClick={onOpenFilter}>
      <Badge badgeContent={4} color="accent">
        <FilterListIcon />
      </Badge>
    </IconButton>
    <More>
      <Menu className={classes.menu}>
        <MenuItem onClick={() => console.log('Work')}>
          <PdfIcon />  Download PDF format
        </MenuItem>
        <MenuItem onClick={() => console.log('Work')}>
          <ExcelIcon />  Download CSV format
        </MenuItem>
      </Menu>
    </More>
  </div>
)

CompanyListActions.propTypes = {
  classes: PropTypes.object.isRequired,
  onOpenFilter: PropTypes.func.isRequired
}

export default withStyles(styles)(CompanyListActions)
