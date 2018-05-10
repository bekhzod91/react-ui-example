import { path, pathOr } from 'ramda'
import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchMyCompaniesAction } from '../actions/myCompanies'
import * as STATE from '../../../constants/state'
import Companies from '../components/Companies'

const mapStateToProps = (state) => ({
  loading: path([STATE.USER_COMPANIES, 'loading'], state),
  list: pathOr([], [STATE.USER_COMPANIES, 'data'], state)
})

const mapDispatchToProps = {
  fetchMyCompaniesAction,
  push
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream((props$) => {
    props$
      .first()
      .subscribe(props => props.fetchMyCompaniesAction())

    return props$
  })
)(Companies)
