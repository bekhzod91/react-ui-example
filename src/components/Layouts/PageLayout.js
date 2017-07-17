import _ from 'lodash'
import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { compose, withPropsOnChange, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as STATE from '../../constants/state'
import * as ROUTE from '../../constants/routes'
import { getToken, clearToken } from '../../helpers/token'
import { fetchProfileAction } from '../../actions/profile'
import Snackbar from '../../components/WithState/Snackbar'
import PageLoading from '../../components/WithState/PageLoading'
import { setTokenAction, clearTokenAction } from '../../routes/User/actions/token'

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
  token: _.get(state, [STATE.SING_IN, 'data', 'token']),
  loading: !(
    _.get(state, [STATE.PROFILE, 'loading']) ||
    _.get(state, [STATE.PROFILE, 'success']) ||
    _.get(state, [STATE.PROFILE, 'failed'])
  ),
})

const PageLayout = ({ children }) => (
  <div style={styles.page}>
    <PageLoading />
    {children}
    <Snackbar />
  </div>
)

PageLayout.propTypes = {
  children: PropTypes.node,
}

const enhance = compose(
  connect(mapStateToProps, { fetchProfileAction, setTokenAction, clearTokenAction }),
  lifecycle({
    componentWillMount () {
      const token = getToken()
      token && this.props.setTokenAction(token)
    }
  }),
  withPropsOnChange(['token'], (props) => {
    props.token && props.fetchProfileAction()
      .catch(() => {
        return Promise.resolve(props.clearTokenAction())
          .then(() => clearToken())
          .then(() => browserHistory.push(ROUTE.SIGN_IN))
      })
  }),
  injectSheet(styles)
)

export default enhance(PageLayout)
