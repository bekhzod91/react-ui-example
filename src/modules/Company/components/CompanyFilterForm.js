import 'rxjs/operator/merge'
import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { compose, pure } from 'recompose'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextWithClearField from '../../../components/Form/TextWithClearField'
import CompanySearchField from '../components/Form/CompanySearchField'
import TableDialog from '../../../components/Table/TableDialog'

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

export const form = 'CompanyFilterForm'
export const fields = ['email', 'owner']
export const formConfig = { form, fields }

const enhance = compose(
  reduxForm({ form, enableReinitialize: true }),
  withStyles(styles),
  pure
)

const CompanyFilterForm = ({ classes, handleSubmit, filter }) => (
  <TableDialog title="Filter" open={filter.open} onClose={filter.onCloseModal}>
    <form onSubmit={handleSubmit(filter.onSubmitModal)}>
      <Field
        component={TextWithClearField}
        name="email"
        label="Email"
        placeholder="Enter Email"
        fullWidth={true}
        margin="normal"
      />

      <Field
        component={CompanySearchField}
        name="owner"
        label="Owner"
        placeholder="Type owner name or email"
        fullWidth={true}
        margin="normal"
      />

      <div className={classes.buttonGroup}>
        <Button
          color="primary"
          variant="raised"
          type="submit">
          Apply
        </Button>
      </div>
    </form>
  </TableDialog>
)

CompanyFilterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    initialValues: PropTypes.object.isRequired,
    onSubmitModal: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    onOpenModal: PropTypes.func.isRequired,
  }).isRequired
}

export default enhance(CompanyFilterForm)
