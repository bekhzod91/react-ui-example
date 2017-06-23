import _ from 'lodash'
import { compose, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { DEFAULT_TIMEOUT } from '../../../constants'
import SelectCompany from '../components/SelectCompany'
import { fetchMyCompaniesAction } from '../modules/myCompaneis'

const mapStateToProps = (state) => ({
  loading: _.get(state, ['myCompanies', 'loading']),
  list: _.get(state, ['myCompanies', 'data'])
})

const mapDispatchToProps = {
  fetchMyCompaniesAction
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPropsOnChange(
    props => !(props.list && !props.loading),
    _.debounce(props => props.fetchMyCompaniesAction(), DEFAULT_TIMEOUT)
  )
)(SelectCompany)
