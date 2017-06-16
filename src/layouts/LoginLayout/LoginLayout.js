import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'

const styles = {
  '@global': {
    body: {
      backgroundColor: '#EEF5F9'
    }
  }
}

export const PageLayout = ({ children }) => (
  <div>
    {children}
  </div>
)

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default injectSheet(styles)(PageLayout)
