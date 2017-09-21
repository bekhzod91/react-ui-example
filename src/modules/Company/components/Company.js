import R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '../../../components/NewAppBar/AppBar'
import CompanyList from './CompanyList'

const Company = ({ appBar, list, detail, ...props }) => {
  const companyId = R.pipe(R.path(['params', 'id']), parseInt)(props)
  const push = R.prop('push', props)
  const route = { location, push, companyId }

  return (
    <AppBar {...appBar}>
      <CompanyList router={route} list={list} detail={detail} />
    </AppBar>
  )
}

Company.propTypes = {
  appBar: PropTypes.object.isRequired,
  list: PropTypes.object,
  listLoading: PropTypes.bool.isRequired,
  detail: PropTypes.object,
}

export default Company
