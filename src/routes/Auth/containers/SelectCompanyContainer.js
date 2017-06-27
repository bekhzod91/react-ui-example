import _ from 'lodash'
import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import SelectCompany from '../components/SelectCompany'
import { fetchMyCompaniesAction } from '../modules/myCompaneis'
import 'rxjs/add/observable/interval'

const mapStateToProps = (state) => ({
  loading: _.get(state, ['myCompanies', 'loading']),
  list: _.get(state, ['myCompanies', 'data']),
  loadingFail: _.get(state, ['myCompanies', 'failed']),
})

const mapDispatchToProps = {
  fetchMyCompaniesAction
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$.subscribe(props => {
      if (!props.list && !props.loading) {
        props.fetchMyCompaniesAction()
      }
    })

    return props$
  })
)(SelectCompany)
