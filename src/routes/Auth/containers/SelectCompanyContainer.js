import _ from 'lodash'
import { compose, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import SelectCompany from '../components/SelectCompany'
import { fetchMyCompaniesAction } from '../modules/myCompaneis'

const mapStateToProps = (state) => ({
  loading: _.get(state, ['myCompanies', 'loading']),
  list: _.get(state, ['myCompanies', 'data']),
  loadingFail: _.get(state, ['myCompanies', 'failed']),
})

const mapDispatchToProps = {
  fetchMyCompaniesAction
}

// const debounce = (func, wait, immediate) => {
//   let timeout
//   return () => {
//     let context = this
//     let args = arguments
//     let later = () => {
//       timeout = null
//       if (!immediate) func.apply(context, args)
//     }
//     let callNow = immediate && !timeout
//     clearTimeout(timeout)
//     timeout = setTimeout(later, wait)
//     if (callNow) func.apply(context, args)
//   }
// }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPropsOnChange((props, nextProps) => {
    return !nextProps.list && !nextProps.loading
  }, props => props.fetchMyCompaniesAction())
)(SelectCompany)
