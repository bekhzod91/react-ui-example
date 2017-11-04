import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { TableDetail } from '../../../components/Table'

const CompanyDetail = ({ detail, route }) => {
  const { loading, data } = detail
  const name = R.pathOr('', ['name'], data)

  return (
    <TableDetail loading={loading}>
      <label>{name}</label>
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
    id: PropTypes.number,
    loading: PropTypes.bool,
    data: PropTypes.object
  }).isRequired
}

export default CompanyDetail
