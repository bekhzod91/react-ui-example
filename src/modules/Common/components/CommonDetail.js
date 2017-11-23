import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui/styles/withStyles'
import ButtonBase from 'material-ui/ButtonBase'

const styles = theme => ({

})

const CommonDetail = ({ title }) => {
  return (
    <ButtonBase
      focusRipple={true}
      title={title}
    />
  )
}

CommonDetail.propTypes = {
  title: PropTypes.string.isRequired
}

export default withStyles(styles)(CommonDetail)
