import _ from 'lodash'
import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { compose, withPropsOnChange, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../constants/state'
import { getToken } from '../../helpers/token'
import { fetchProfileAction } from '../../actions/profile'
import Snackbar from '../../components/withState/Snackbar/Snackbar'
import { setTokenAction } from '../../routes/User/actions/token'

const styles = {
  '@global': {
    body: {
      backgroundColor: '#EEF5F9',
      height: '100%',
      width: '100%'
    },
    html: {
      height: '100%',
      width: '100%'
    }
  },
  page: {
    height: '100%'
  }
}

const mapStateToProps = (state) => ({
  token: _.get(state, [STATE.SING_IN, 'data']),
  loading: !(
    _.get(state, [STATE.PROFILE, 'loading']) ||
    _.get(state, [STATE.PROFILE, 'success']) ||
    _.get(state, [STATE.PROFILE, 'failed'])
  ),
})

export const PageLayout = ({ children }) => (
  <div style={styles.page}>
    {children}
    <Snackbar />
  </div>
)

PageLayout.propTypes = {
  children: PropTypes.node,
}

const enhance = compose(
  connect(mapStateToProps, { fetchProfileAction, setTokenAction }),
  lifecycle({
    componentWillMount () {
      const token = getToken()
      token && this.props.setTokenAction()
    }
  }),
  withPropsOnChange(['token'], (props) => {
    props.token && props.fetchProfileAction()
  }),
  injectSheet(styles)
)

export default enhance(PageLayout)
