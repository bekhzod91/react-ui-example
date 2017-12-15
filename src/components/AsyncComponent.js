import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PageLoading from '../components/PageLoading'

class AsyncComponent extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      Component: null
    }
  }

  componentWillMount () {
    if (!this.state.Component) {
      this.props.moduleProvider()
        .then((Component) => this.setState({ Component }))
    }
  }

  render () {
    const { Component } = this.state

    return (
      <div>
        {Component ? <Component {...this.props} /> : <PageLoading />}
      </div>
    )
  }
}

AsyncComponent.propTypes = {
  moduleProvider: PropTypes.func.isRequired
}

export default AsyncComponent
