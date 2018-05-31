import { compose, pure, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import { getIdFromProps, getDataFromState } from '../helpers/get'

export default ({ stateName, action }) => {
  const mapStateToProps = state => ({ item: getDataFromState(stateName, state) })

  return compose(
    connect(mapStateToProps, { action }),
    mapPropsStream(props$ => {
      props$
        .filter(getIdFromProps)
        .distinctUntilChanged(null, getIdFromProps)
        .subscribe(props => props.action(getIdFromProps(props)))

      return props$
    }),
    pure
  )
}
