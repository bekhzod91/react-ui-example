import { path, prop } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import * as ROUTE from '../../../constants/routes'
import { getRouteFromProps } from '../../../helpers/get'
import AppBar from '../../../components/AppBar'
import CompanyList from './CompanyList'
import CompanyDetail from './CompanyDetail'

const Company = ({ list, filter, ...props }) => {
  const route = getRouteFromProps(props)

  const detail = {
    id: path(['detail', 'id'], props),
    detail: (
      <CompanyDetail route={route} detail={prop('detail', props)} />
    )
  }

  return (
    <AppBar activeMenuName={ROUTE.COMPANY}>
      <CompanyList
        route={route}
        filter={filter}
        list={list}
        detail={detail}
      />
    </AppBar>
  )
}

Company.propTypes = {
  list: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
}

export default Company
