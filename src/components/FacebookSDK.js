/* global FB */
import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import * as API from '../constants/api'

class FacebookSDK extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      fbLoading: false
    }
  }

  componentDidMount () {
    window.fbAsyncInit = () => {
      FB.init({
        appId      : API.FACEBOOK_API_APP_ID,
        cookie     : true,
        xfbml      : true,
        version    : API.FACEBOOK_API_VERSION
      })

      FB.AppEvents.logPageView()

      this.setState({ fbLoading: false })
      this.resolve()
    }
  }

  injectFacebookSdk = () => {
    return new Promise((resolve, reject) => {
      this.resolve = resolve

      const scriptId = 'facebook-jssdk'
      if (document.getElementById(scriptId)) {
        resolve()
        return
      }

      this.setState({ fbLoading: true })

      // Inject fb script
      const facebookJS = document.getElementsByTagName('script')[0]
      const js = document.createElement('script')

      js.id = scriptId
      js.src = '//connect.facebook.net/en_US/sdk.js'
      facebookJS.parentNode.insertBefore(js, facebookJS)

      // Connection timeout case
      _.delay(() => {
        this.setState({ fbLoading: false })
        reject(new Error('Timeout facebook sdk'))
      }, API.DEFAULT_TIMEOUT)
    })
  }

  render () {
    const { children } = this.props

    return React.cloneElement(children, {
      fbLoading: this.state.fbLoading,
      fbLoad: this.injectFacebookSdk
    })
  }
}

export default FacebookSDK
