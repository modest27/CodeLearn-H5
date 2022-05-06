import React, { Suspense } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import AuthRoute from '@/components/AuthRoute'
import history from './utils/history'

const Login = React.lazy(() => import('@/pages/Login'))
const Home = React.lazy(() => import('@/pages/Layout'))
const ProfileEdit = React.lazy(() => import('@/pages/Profile/Edit'))
const ProfileChat = React.lazy(() => import('@/pages/Profile/Chat'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))
const ProfileFeedback = React.lazy(() => import('@/pages/Profile/Feedback'))
const Search = React.lazy(()=>import('@/pages/Search'))

export default function App() {
  return (
    <Router history={history}>
      <div className="app">
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <Route path="/login" component={Login}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/search" component={Search}></Route>
            <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
            <AuthRoute path="/profile/chat" component={ProfileChat}></AuthRoute>
            <AuthRoute path="/profile/feedback" component={ProfileFeedback}></AuthRoute>
            {/* 404页面 */}
            <Route component={NotFound}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}
