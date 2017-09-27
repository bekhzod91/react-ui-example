import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
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
      <div style={styles.page} key={'Base'}>
        <PageLoading />
        {children && React.cloneElement(children, { appBar: getProps(props) })}
        <Snackbar />
      </div>
    )
  }
}

export default injectSheet(styles)(BaseLayout)
