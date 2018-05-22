import { compose, curry, prop, pathOr, path, __ } from 'ramda'
import sprintf from 'sprintf'
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Table, TableHeader, TableCell, TableRow, TableColumn, TableBody } from '../../../components/Table'
import { appendParamsToUrl } from '../../../helpers/urls'
import { fromNow } from '../../../helpers/dateFormat'
import * as DATE_FORMAT from '../../../constants/dateFromat'
import * as ROUTES from '../../../constants/routes'
import CompanyListActions from './CompanyListActions'

import CompanyListFilterForm from './CompanyListFilterForm'

const CompanyList = ({ route, filter, list, detail, ...props }) => {
  const query = path(['location', 'query'], route)
  const results = pathOr([], ['data', 'results'], list)
  const getLink = (item) => {
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

  return (
    <Table
      route={route}
      list={list}
      detail={detail}
      actions={actions}
      dialogs={dialogs}>
      <TableHeader>
        <TableRow>
          <TableCell sortKey="id">ID</TableCell>
          <TableCell columnSize={2} sortKey="name">Name</TableCell>
          <TableCell columnSize={3} sort="owner">Owner</TableCell>
          <TableCell columnSize={2} sortKey="status">Status</TableCell>
          <TableCell columnSize={2} sortKey="createDate">Create date</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell >{getLink(item)}</TableCell>
            <TableCell columnSize={2}> {prop('name', item)}</TableCell>
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
  )
}

CompanyList.propTypes = {
  list: PropTypes.shape({
    count: PropTypes.number,
    results: PropTypes.array
  }),
  detail: PropTypes.shape({
    id: PropTypes.number,
    detail: PropTypes.node
  }).isRequired,
  route: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
}

export default CompanyList
