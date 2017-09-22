import R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { TableDetail } from '../../../components/Table'

const CompanyDetail = ({ detail, route }) => {
  const name = R.prop('name', detail)
  const loading = R.prop('loading', detail)

  return (
    <TableDetail loading={loading}>
      <lable>{name}</lable>
    </TableDetail>
  )
}

CompanyDetail.propTypes = {
  route: PropTypes.shape({
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    companyId: PropTypes.number.isRequired,
  }).isRequired,
  detail: PropTypes.shape({
    id: PropTypes.number
  }).isRequired
}

export default CompanyDetail
