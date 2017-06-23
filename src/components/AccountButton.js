import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import AccountIcon from './AccountIcon'

const AccountButton = (props) => {
  const { position, setState } = props
  const translate = _.get(position, 'open') ? 'translate(290px)' : 'translate(90px)'
  const onTouchTap = _.get(position, 'account')
    ? () => setState({ ...position, account: false }) : () => setState({ ...position, account: true })
  return (
    <IconButton
      onTouchTap={onTouchTap}
      style={{ transform: translate, position: 'absolute' }}>
      <AccountIcon />
    </IconButton>
  )
}

AccountButton.propTypes = {
  position: PropTypes.object,
  setState: PropTypes.func.isRequired
}

export default AccountButton
