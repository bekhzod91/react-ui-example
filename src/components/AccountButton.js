import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import AccountIcon from './AccountIcon'

const AccountButton = (props) => {
  const { position, positionChange } = props
  const onTouchTap = _.get(position, 'account')
    ? () => positionChange({ ...position, account: false }) : () => positionChange({ ...position, account: true })
  return (
    <IconButton onTouchTap={onTouchTap}>
      <AccountIcon />
    </IconButton>
  )
}

AccountButton.propTypes = {
  position: PropTypes.object,
  positionChange: PropTypes.func.isRequired
}

export default AccountButton
