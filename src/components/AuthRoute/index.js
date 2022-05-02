import { hasToken } from '@/utils/storage'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function index({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (hasToken()) {
          return <Component></Component>
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                from: location
              }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}
