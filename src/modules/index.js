// We only need to import the modules necessary for initial render
import React from 'react'
import { Switch } from 'react-router'
import { RouteWithLayout } from '../helpers/router'
import Dashboard from './Dashboard'
import Auth from './Auth'
import User from './User'
import Error from './Error'
import Company from './Company'
import Common from './Common'


export default (store) => {
  const routes = [
    ...Auth(store),
    ...User(store),
    ...Dashboard(store),
    ...Common(store),
    ...Company(store),
    ...Error(store),
  ]

  return (
    <div style={{ height: '100%' }}>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithLayout key={i} {...route} />
        ))}
      </Switch>
    </div>
  )
}
