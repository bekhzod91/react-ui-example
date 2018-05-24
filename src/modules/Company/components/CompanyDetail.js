import { pathOr } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

const CompanyDetail = ({ data }) => {
  const name = pathOr('', ['name'], data)

  return (
    <label>{name}</label>
  )
}

CompanyDetail.propTypes = {
  data: PropTypes.object.isRequired
}

export default CompanyDetail
