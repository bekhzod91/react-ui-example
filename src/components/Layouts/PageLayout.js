import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import Snackbar from '../../components/WithState/Snackbar'
import PageLoading from '../../components/WithState/PageLoading'

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

const PageLayout = ({ children }) => (
  <div style={styles.page}>
    <PageLoading />
    {children}
    <Snackbar />
  </div>
)

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default injectSheet(styles)(PageLayout)
