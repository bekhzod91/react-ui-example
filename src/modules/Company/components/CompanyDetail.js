import get from 'lodash/fp/get'
import React from 'react'
import PropTypes from 'prop-types'
import { TableDetail } from '../../../components/Table'

const CompanyDetail = ({ loading, detail }) => {
  const name = get('name', detail)

  return (
    <TableDetail loading={loading}>
      <lable>{name}</lable>
    </TableDetail>
  )
}

CompanyDetail.propTypes = {
  detail: PropTypes.object,
  loading: PropTypes.bool.isRequired
}

export default CompanyDetail
