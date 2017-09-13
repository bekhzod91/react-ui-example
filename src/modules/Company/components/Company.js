import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import toInteger from 'lodash/fp/toInteger'
import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'
import CompanyList from './CompanyList'
import CompanyDetail from './CompanyDetail'

const Company = ({ appBar, list, listLoading, detail, detailLoading, ...props }) => {
  const companyId = flow(get(['params', 'companyId']), toInteger)(props)
  const detailId = flow(get(['params', 'id']), toInteger)(props)

  return (
    <AppBar {...appBar}>
      <CompanyList
        companyId={companyId}
        detail={(
          <CompanyDetail detail={detail} loading={detailLoading} />
        )}
        detailId={detailId}
        list={list}
        loading={listLoading}
      />
    </AppBar>
  )
}

Company.propTypes = {
  appBar: PropTypes.object.isRequired,
  list: PropTypes.object,
  listLoading: PropTypes.bool.isRequired,
  detail: PropTypes.object,
  detailLoading: PropTypes.bool.isRequired
}

export default Company
