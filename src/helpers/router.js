import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import PageLoading from '../components/PageLoading'

// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
export function AsyncComponent (getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount () {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render () {
      const { Component } = this.state

      if (Component) {
        console.log(Component)
        return <Component {...this.props} />
      }

      return <PageLoading {...this.props} />
    }
  }
}

export const RouteWithLayout = ({ layout, component, ...rest }) => {
  return (
    <Route {...rest} render={(props) =>
      React.createElement(layout, props, React.createElement(component, props))
    } />
  )
}

RouteWithLayout.propTypes = {
  layout: PropTypes.any.isRequired,
  component: PropTypes.any.isRequired,
}
