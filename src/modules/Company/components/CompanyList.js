import R from 'ramda'
import sprintf from 'sprintf'
import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import * as ROUTE from '../../../constants/routes'
import { fromNow } from '../../../helpers/dateFormat'

import { Table, TableHeader, TableCell, TableRow, TableColumn } from '../../../components/Table'

const CompanyList = ({ list, detail, route }) => {
  const companyId = R.prop('companyId', route)
  const getLink = (item) => {
    const id = R.prop('id', item)
    const url = sprintf(ROUTE.COMPANY_DETAIL_PATH, parseInt(companyId), parseInt(id))

    return (
      <Link to={url}><strong>{id}</strong></Link>
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
    R.curry(fromNow)(R.__, 'DD.MM.YYYY HH:mm')
  )

  return (
    <Table route={route} detail={detail} list={list}>
      <TableHeader>
        <TableCell sort="id">ID</TableCell>
        <TableCell columnSize={3} sort="name">Title</TableCell>
        <TableCell sort="owner" columnSize={3}>Owner</TableCell>
        <TableCell columnSize={2} sort="status">Status</TableCell>
        <TableCell columnSize={2} sort="Create date">Create date</TableCell>
        <TableCell>Actions</TableCell>
      </TableHeader>
      <TableRow>
        <TableColumn content={getLink} />
        <TableColumn content={R.prop('name')} columnSize={3} />
        <TableColumn content={getFullNameOrEmail} columnSize={3} />
        <TableColumn content={R.prop('status')} columnSize={2} />
        <TableColumn content={getCreateDate} columnSize={2} />
        <TableColumn content={(item) => <button>Click</button>} />
      </TableRow>
    </Table>
  )
}

CompanyList.propTypes = {
  list: PropTypes.shape({
    count: PropTypes.number,
    results: PropTypes.array
  }),
  detail: PropTypes.node.isRequired,
  route: PropTypes.object
}

export default CompanyList
