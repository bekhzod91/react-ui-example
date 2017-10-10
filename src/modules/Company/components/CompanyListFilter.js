import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
import withStyles from 'material-ui-next/styles/withStyles'
import Button from 'material-ui-next/Button'
import TableDialog from '../../../components/Table/TableDialog'
import TextFieldNext from '../../../components/Form/SimpleFields/TextFieldNext'
import validate from '../../../helpers/validate'

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

const form = 'CompanyListFilterForm'

const CompanyListFilter = ({ classes, handleSubmit, onSubmit }) => (
  <TableDialog title="Filter">
    <form onSubmit={handleSubmit(() => onSubmit().catch(validate))}>
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
  onSubmit: PropTypes.func.isRequired,
}

export default compose(
  reduxForm({ form }),
  withStyles(styles)
)(CompanyListFilter)
