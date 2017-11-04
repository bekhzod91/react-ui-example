import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'
import withStyles from 'material-ui-next/styles/withStyles'
import Snackbar from '../../components/WithState/Snackbar'
import PageLoading from '../../components/WithState/PageLoading'
import { getProps } from '../AppBar'

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
    const { children, ...props } = this.props

    return (
      <div style={styles.page}>
        <PageLoading />
        {children && React.cloneElement(children, { appBar: getProps(props) })}
        <Snackbar />
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  pure
)(BaseLayout)
