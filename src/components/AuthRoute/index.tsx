import { hasToken } from '@/utils/storage'
import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface Props extends RouteProps {
  // any：组件的props可以接收any类型
  component: React.ComponentType<any>
}
export default function index({ component: Component, ...rest }:Props) {
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
                state: { from: location.pathname }
              }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}
