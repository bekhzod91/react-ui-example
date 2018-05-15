import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'
import withStyles from '@material-ui/core/styles/withStyles'
import PageLoading from '../PageLoading'
import Snackbar from '../Snackbar'
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

class BaseLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render () {
    const { children } = this.props

    return (
      <div style={styles.page}>
        <PageLoading />
        {children && React.cloneElement(children, { app: getDefaultProps(this.props) })}
        <Snackbar />
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  pure
)(BaseLayout)
