import React, { lazy, Suspense } from 'react'
import styles from './index.module.scss'
import Icon from '@/components/Icon'
import { useHistory, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { Switch, Route } from 'react-router-dom'
import AuthRoute from '@/components/AuthRoute'

const Home = lazy(() => import('@/pages/Home'))
const QA = lazy(() => import('@/pages/QA'))
const Video = lazy(() => import('@/pages/Video'))
const Profile = lazy(() => import('@/pages/Profile'))

const tabBar = [
  {
    title: '首页',
    icon: 'iconbtn_home',
    path: '/home'
  },
  {
    title: '问答',
    icon: 'iconbtn_qa',
    path: '/home/qa'
  },
  {
    title: '视频',
    icon: 'iconbtn_video',
    path: '/home/video'
  },
  {
    title: '我的',
    icon: 'iconbtn_mine',
    path: '/home/profile'
  }
]

export default function Layout() {
  const history = useHistory()
  const location = useLocation()
  return (
    <div className={styles.root}>
      {/* 区域一：点击按钮切换显示内容的区域 */}
      <div className="tab-content">
        {/* 配置二级路由 */}
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route exact path="/home" component={Home}></Route>
            <Route path="/home/qa" component={QA}></Route>
            <Route path="/home/video" component={Video}></Route>
            <AuthRoute path="/home/profile" component={Profile}></AuthRoute>
          </Switch>
        </Suspense>
      </div>
      {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        {tabBar.map(item => {
          return (
            <div className={classNames('tabbar-item', location.pathname === item.path ? 'tabbar-item-active' : '')} key={item.title} onClick={() => history.push(item.path)}>
              <Icon type={location.pathname === item.path ? item.icon + '_sel' : item.icon} />
              <span>{item.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
