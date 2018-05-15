import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import LinearProgress from '@material-ui/core/LinearProgress'

const style = {
  position: 'absolute',
  zIndex: 1200,
  top: 0,
  right: 0,
  height: 4,
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
}

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
        return <Component {...this.props} />
      }

      return <LinearProgress style={style} />
    }
  }
}

const RouteWithLayout = ({ layout, component, path }) => {
  return (
    <Route exect={true} path={path} render={props =>
      React.createElement(layout, props, React.createElement(component, props))
    } />
  )
}

RouteWithLayout.propTypes = {
  layout: PropTypes.any.isRequired,
  path: PropTypes.any.isRequired,
  component: PropTypes.any.isRequired,
}

export default RouteWithLayout
