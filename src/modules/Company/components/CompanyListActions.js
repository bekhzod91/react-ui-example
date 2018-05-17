import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import FilterListIcon from '@material-ui/icons/FilterList'
import More from '../../../components/More'
import ExcelIcon from '../../../components/Icon/ExcelIcon'
import PdfIcon from '../../../components/Icon/PdfIcon'

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

const CompanyListActions = ({ classes, onOpenFilter, filterCount }) => (
  <div className={classes.root}>
    <IconButton onClick={onOpenFilter}>
      {Boolean(filterCount) && <Badge badgeContent={filterCount} color="secondary">
        <FilterListIcon />
      </Badge>}
      {!filterCount && <FilterListIcon />}
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
  filterCount: PropTypes.number.isRequired,
  onOpenFilter: PropTypes.func.isRequired
}

export default withStyles(styles)(CompanyListActions)
