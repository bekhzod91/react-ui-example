import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { compose, pure } from 'recompose'
import withStyles from '@material-ui/core/styles/withStyles'
import CompanySearchField from '../components/Form/CompanySearchField'
import TextWithClearField from '../../../components/Form/TextWithClearField'

const styles = {
  buttonGroup: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
      marginLeft: 10
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  body: {
    width: '700px'
  }
}

export const fields = ['email', 'owner', 'busActivity', 'ecoActivity', 'gcp']
export const form = 'CompanyForm'
export const formConfig = { form, fields }

const enhance = compose(
  reduxForm({ form, enableReinitialize: true }),
  withStyles(styles),
  pure
)

const CompanyForm = ({ classes, handleSubmit, ...props }) => (
  <form onSubmit={handleSubmit(props.onSubmitModal)}>
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
    <Field
      component={TextWithClearField}
      name="busActivity"
      label="busActivity"
      placeholder="Type bus activity"
      fullWidth={true}
      margin="normal"
    />
    <Field
      component={TextWithClearField}
      name="ecoActivity"
      label="ecoActivity"
      placeholder="Type eco activity"
      fullWidth={true}
      margin="normal"
    />
    <Field
      component={TextWithClearField}
      name="gcp"
      label="gcp"
      placeholder="Type gcp"
      fullWidth={true}
      margin="normal"
    />
  </form>
)

CompanyForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onSubmitModal: PropTypes.func.isRequired,
}

export default enhance(CompanyForm)
