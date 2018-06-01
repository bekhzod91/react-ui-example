import { path } from 'ramda'
import { compose, pure, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import { getDataFromState, getListParamsFromProps } from '../helpers/get'
import { isEqualSearch, IGNORE_PARAMS } from '../helpers/isEquals'

export default params => {
  const { stateName, action, mapper = getListParamsFromProps, ignore = IGNORE_PARAMS } = params
  const mapStateToProps = state => ({ list: getDataFromState(stateName, state) })

  return compose(
    connect(mapStateToProps, { action }),
    mapPropsStream(props$ => {
      props$
        .distinctUntilChanged(
          isEqualSearch(ignore),
          path(['history', 'location', 'search'])
        )
        .subscribe(props => props.action(mapper(props)))

      return props$
    }),
    pure
  )
}
