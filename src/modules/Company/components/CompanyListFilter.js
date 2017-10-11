import 'rxjs/operator/merge'
import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { compose, pure } from 'recompose'
import withStyles from 'material-ui-next/styles/withStyles'
import Button from 'material-ui-next/Button'
import TableDialog from '../../../components/Table/TableDialog'
import TextFieldNext from '../../../components/Form/SimpleFields/TextFieldNext'

const styles = {
  buttonGroup: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
      marginLeft: 10
    }
  }
}

export const form = 'CompanyListFilterForm'

const CompanyListFilter = ({ classes, handleSubmit, route, onSubmit }) => (
  <TableDialog route={route} title="Filter">
    <form onSubmit={onSubmit}>
      <Field
        component={TextFieldNext}
        name="email"
        label="Email"
        placeholder="Enter Email"
        fullWidth={true}
        margin="normal"
      />

      <Field
        component={TextFieldNext}
        name="email1"
        label="Email"
        placeholder="Enter Email"
        fullWidth={true}
        margin="normal"
      />

      <div className={classes.buttonGroup}>
        <Button color="primary" raised={true} type="submit">Apply</Button>
      </div>
    </form>
  </TableDialog>
)

CompanyListFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  onSubmit: PropTypes.any.isRequired,
}

export default compose(
  reduxForm({ form }),
  withStyles(styles),
  pure
)(CompanyListFilter)
