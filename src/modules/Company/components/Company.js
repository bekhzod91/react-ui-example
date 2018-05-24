import { path, prop } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import * as ROUTES from '../../../constants/routes'
import { getRouteFromProps } from '../../../helpers/get'
import AppBar from '../../../components/AppBar'
import TableContent from '../../../components/Table/TableContent'
import CompanyDetail from './CompanyDetail'
import CompanyList from './CompanyList'

const Company = ({ list, item, filter, ...props }) => {
  const route = getRouteFromProps(props)

  const detail = {
    id: path(['detail', 'id'], props),
    detail:(
      <TableContent loading={item.loading}>
        {item.data && <CompanyDetail data={item.data} />}
      </TableContent>
    )
  }

  return (
    <AppBar active={ROUTES.COMPANY} {...props.app}>
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
  app: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
}

export default Company
