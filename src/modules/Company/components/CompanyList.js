import { compose, __, curry, path, pathOr, prop } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import sprintf from 'sprintf'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import * as ROUTES from '../../../constants/routes'
import { getRouteFromProps } from '../../../helpers/get'
import AppBar from '../../../components/AppBar'
import TableContent from '../../../components/Table/TableContent'
import { Table, TableHeader, TableCell, TableRow, TableBody } from '../../../components/Table'
import * as DATE_FORMAT from '../../../constants/dateFromat'
import { fromNow } from '../../../helpers/dateFormat'
import { appendParamsToUrl } from '../../../helpers/urls'
import CompanyDetail from './CompanyDetail'
import CompanyListActions from './CompanyListActions'
import CompanyListFilterForm from './CompanyListFilterForm'

const Company = ({ list, item, filter, ...props }) => {
  const route = getRouteFromProps(props)

  const query = path(['location', 'query'], route)
  const results = pathOr([], ['data', 'results'], list)
  const getLink = item => {
    const id = prop('id', item)
    const url = sprintf(ROUTES.COMPANY_DETAIL_PATH, parseInt(id))
    const urlWithParams = appendParamsToUrl(query, url)

    return (
      <Link to={urlWithParams}><strong>{id}</strong></Link>
    )
  }

  const getFullNameOrEmail = (item) => {
    const firstName = path(['owner', 'firstName'], item)
    const secondName = path(['owner', 'secondName'], item)

    if (firstName && secondName) {
      return `${firstName} ${secondName}`
    }

    return path(['owner', 'email'], item)
  }

  const getCreateDate = compose(
    curry(fromNow)(__, DATE_FORMAT.DEFAULT_FORMAT),
    prop('createdDate')
  )

  const dialogs = (
    <CompanyListFilterForm
      filter={filter}
      initialValues={filter.initialValues} />
  )
  const actions = (
    <CompanyListActions
      filterCount={filter.count}
      onOpenFilter={filter.onOpenFilter} />
  )

  const detail = (
    <TableContent loading={item.loading}>
      {item.data && <CompanyDetail data={item.data} />}
    </TableContent>
  )

  return (
    <AppBar active={ROUTES.COMPANY} {...props.app}>
      <Table
        list={list}
        detail={detail}
        actions={actions}
        dialogs={dialogs}>
        <TableHeader>
          <TableRow>
            <TableCell sortKey="id">ID</TableCell>
            <TableCell columnSize={3} sortKey="name">Name</TableCell>
            <TableCell columnSize={3} sort="owner">Owner</TableCell>
            <TableCell columnSize={2} sortKey="status">Status</TableCell>
            <TableCell columnSize={2} sortKey="createDate">Create date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{getLink(item)}</TableCell>
              <TableCell columnSize={3}> {prop('name', item)}</TableCell>
              <TableCell columnSize={3}>{getFullNameOrEmail(item)}</TableCell>
              <TableCell columnSize={2}>{prop('status', item)} </TableCell>
              <TableCell columnSize={2}>{getCreateDate(item)}</TableCell>
              <TableCell>
                <div>
                  <IconButton><EditIcon /></IconButton>
                  <IconButton><DeleteIcon /></IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppBar>
  )
}

Company.propTypes = {
  app: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
}

export default Company
