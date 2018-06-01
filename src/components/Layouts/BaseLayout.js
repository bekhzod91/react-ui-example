import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'
import withStyles from '@material-ui/core/styles/withStyles'
import PageLoading from '../PageLoading'
import Snackbar from '../Snackbar'
import ConfirmDialog from '../ConfirmDialog'
import { getDefaultProps } from '../../helpers/app'

const styles = {
  '@global': {
    body: {
      backgroundColor: '#EEF5F9',
      height: '100%',
      width: '100%'
    },
    html: {
      height: '100%',
      width: '100%'
    }
  },
  page: {
    height: '100%'
  }
}

const BaseLayout = ({ classes, ...props }) => (
  <div className={classes.page}>
    <PageLoading />
    {props.children && React.cloneElement(props.children, { app: getDefaultProps(props) })}
    <Snackbar />
    <ConfirmDialog />
  </div>
)

BaseLayout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
}

export default compose(
  withStyles(styles),
  pure
)(BaseLayout)
