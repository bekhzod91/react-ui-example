import { compose, prop } from 'ramda'
import { pure, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import { getDataFromState, getParamsFormHistory } from '../helpers/get'
import { isEqualSearch, IGNORE_PARAMS } from '../helpers/isEquals'
import { mapParamsToRequest, decodeURLParams } from '../helpers/mapper'

const defaultMapper = compose(
  mapParamsToRequest,
  decodeURLParams,
  getParamsFormHistory,
  prop('history')
)

export default params => {
  const { stateName, action, mapper = defaultMapper, ignore = IGNORE_PARAMS } = params
  const mapStateToProps = state => ({ list: getDataFromState(stateName, state) })

  return compose(
    connect(mapStateToProps, { action }),
    mapPropsStream(props$ => {
      props$
        .distinctUntilChanged(isEqualSearch(ignore))
        .subscribe(props => props.action(mapper(props)))

      return props$
    }),
    pure
  )
}
