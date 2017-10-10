import R from 'ramda'
import sprintf from 'sprintf'
import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import IconButton from 'material-ui-next/IconButton'
import EditIcon from 'material-ui-icons/Edit'
import DeleteIcon from 'material-ui-icons/Delete'
import * as ROUTE from '../../../constants/routes'
import * as DATE_FORMAT from '../../../constants/dateFromat'
import { fromNow } from '../../../helpers/dateFormat'
import { appendParamsToUrl } from '../../../helpers/urls'

import { Table, TableHeader, TableCell, TableRow, TableColumn } from '../../../components/Table'
import CompanyListFilter from './CompanyListFilter'

const CompanyList = ({ list, detail, route }) => {
  const companyId = R.prop('companyId', route)
  const query = R.path(['location', 'query'], route)
  const getLink = (item) => {
    const id = R.prop('id', item)
    const url = sprintf(ROUTE.COMPANY_DETAIL_PATH, parseInt(companyId), parseInt(id))
    const urlWithParams = appendParamsToUrl(query, url)

    return (
      <Link to={urlWithParams}><strong>{id}</strong></Link>
    )
  }

  const getFullNameOrEmail = (item) => {
    const firstName = R.path(['owner', 'firstName'], item)
    const secondName = R.path(['owner', 'secondName'], item)

    if (firstName && secondName) {
      return `${firstName} ${secondName}`
    }

    return R.path(['owner', 'email'], item)
  }

  const getCreateDate = R.pipe(
    R.prop('createdDate'),
    R.curry(fromNow)(R.__, DATE_FORMAT.DEFAULT_FORMAT)
  )

  const companyListFilter = (
    <CompanyListFilter onSubmit={(value) => console.log(value)} />
  )

  return (
    <Table route={route} detail={detail} list={list} filter={companyListFilter}>
      <TableHeader>
        <TableCell sort="id">ID</TableCell>
        <TableCell columnSize={3} sort="name">Title</TableCell>
        <TableCell sort="owner" columnSize={3}>Owner</TableCell>
        <TableCell columnSize={2} sort="status">Status</TableCell>
        <TableCell columnSize={2} sort="createDate">Create date</TableCell>
        <TableCell style={{ textAlign: 'center' }}>Actions</TableCell>
      </TableHeader>
      <TableRow>
        <TableColumn content={getLink} />
        <TableColumn content={R.prop('name')} columnSize={3} />
        <TableColumn content={getFullNameOrEmail} columnSize={3} />
        <TableColumn content={R.prop('status')} columnSize={2} />
        <TableColumn content={getCreateDate} columnSize={2} />
        <TableColumn content={(item) => <div>
          <IconButton><EditIcon /></IconButton>
          <IconButton><DeleteIcon /></IconButton>
        </div>} />
      </TableRow>
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
  route: PropTypes.object
}

export default CompanyList
