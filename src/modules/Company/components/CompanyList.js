import { compose, __, curry, path, pathOr, prop } from 'ramda'
import sprintf from 'sprintf'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import * as DATE_FORMAT from '../../../constants/dateFromat'
import * as ROUTES from '../../../constants/routes'
import AppBar from '../../../components/AppBar'
import FloatingButton from '../../../components/FloatingButton'
import TableContent from '../../../components/Table/TableContent'
import { Table, TableHeader, TableCell, TableRow, TableBody } from '../../../components/Table'
import { getIdFromProps } from '../../../helpers/get'
import { fromNow } from '../../../helpers/dateFormat'
import { capitalize } from '../../../helpers/textFormat'
import { redirect } from '../../../helpers/route'
import ActionDialog from '../../../components/ActionDialog'
import CompanyDetail from './CompanyDetail'
import CompanyActions from './CompanyActions'
import CompanyFilterForm from './CompanyFilterForm'
import CompanyForm from './CompanyForm'

const CompanyList = props => {
  const { list, item, filter, create, edit, remove, history } = props
  const results = pathOr([], ['data', 'results'], list)

  const id = getIdFromProps(props)
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
    <CompanyFilterForm
      filter={filter}
      initialValues={filter.initialValues} />
  )
  const actions = (
    <CompanyActions
      filterCount={filter.count}
      onOpenModal={filter.onOpenModal} />
  )

  const content = (
    <TableContent key={id} loading={item.loading}>
      {item.data && <CompanyDetail item={item} edit={edit} />}
    </TableContent>
  )

  return (
    <AppBar active={ROUTES.COMPANY} {...props.app}>
      <Table
        list={list}
        actions={actions}
        dialogs={dialogs}>
        <TableHeader>
          <TableRow>
            <TableCell sortKey="id">id</TableCell>
            <TableCell columnSize={2} sortKey="name">name</TableCell>
            <TableCell columnSize={2}>gcp</TableCell>
            <TableCell columnSize={2} sortKey="owner">owner</TableCell>
            <TableCell columnSize={2} sortKey="status">status</TableCell>
            <TableCell columnSize={2} sortKey="created_date">created date</TableCell>
            <TableCell>action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody content={content}>
          {results.map(item => {
            const search = path(['location', 'search'], history)
            const infoUrl = sprintf(ROUTES.COMPANY_DETAIL_TAB_URL, item.id, 'info') + search
            const editUrl = sprintf(ROUTES.COMPANY_DETAIL_TAB_URL, item.id, 'edit') + search

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <Link to={infoUrl}>
                    <strong>{item.id}</strong>
                  </Link>
                </TableCell>
                <TableCell columnSize={2}>{item.name}</TableCell>
                <TableCell columnSize={2}>{item.gcp}</TableCell>
                <TableCell columnSize={2}>{getFullNameOrEmail(item)}</TableCell>
                <TableCell columnSize={2}>{capitalize(item.status)}</TableCell>
                <TableCell columnSize={2}>{getCreateDate(item)}</TableCell>
                <TableCell>
                  <div>
                    <IconButton onClick={() => redirect(editUrl, history)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => remove.openConfirmDialog(item)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <ActionDialog title="Create company" {...create}>
        <CompanyForm />
      </ActionDialog>
      <FloatingButton action={create.onOpenModal} />
    </AppBar>
  )
}

CompanyList.propTypes = {
  app: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  create: PropTypes.object.isRequired,
  edit: PropTypes.object.isRequired,
  remove: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
}

export default CompanyList
