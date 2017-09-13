import get from 'lodash/fp/get'
import curryRight from 'lodash/fp/curryRight'
import flow from 'lodash/fp/flow'
import toInteger from 'lodash/fp/toInteger'
import sprintf from 'sprintf'
import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import * as ROUTE from '../../../constants/routes'
import { fromNow } from '../../../helpers/dateFormat'
import { Table, TableHeader, TableCell, TableRow, TableColumn, listToTableProps } from '../../../components/Table'

const CompanyList = ({ companyId, detailId, loading, list, detail }) => {
  const getLink = (item) => {
    const id = get('id', item)
    const url = sprintf(ROUTE.COMPANY_DETAIL_PATH, toInteger(companyId), toInteger(id))

    return (
      <Link to={url}><strong>{id}</strong></Link>
    )
  }

  const getFullNameOrEmail = (item) => {
    const firstName = get(['owner', 'firstName'], item)
    const secondName = get(['owner', 'secondName'], item)

    if (firstName && secondName) {
      return `${firstName} ${secondName}`
    }

    return get(['owner', 'email'], item)
  }

  const getCreateDate = flow(
    get('createdDate'),
    curryRight(fromNow)('DD.MM.YYYY HH:mm')
  )

  return (
    <Table
      detail={detail}
      detailId={detailId}
      loading={loading}
      {...listToTableProps(list)}>
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
        <TableColumn content={get('name')} columnSize={3} />
        <TableColumn content={getFullNameOrEmail} columnSize={3} />
        <TableColumn content={get('status')} columnSize={2} />
        <TableColumn content={getCreateDate} columnSize={2} />
        <TableColumn content={(item) => <button>Click</button>} />
      </TableRow>
    </Table>
  )
}

CompanyList.propTypes = {
  // classes: PropTypes.object.isRequired,
  companyId: PropTypes.number.isRequired,
  detailId: PropTypes.number,
  list: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  detail: PropTypes.node
}

export default CompanyList
