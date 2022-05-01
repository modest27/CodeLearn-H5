import NavBar from '@/components/NavBar'
import { getProfile } from '@/store/actions/profile'
import { logout } from '@/store/actions/login'
import { List, Modal, Toast } from 'antd-mobile'
import classNames from 'classnames'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'

const { Item } = List

export default function Edit() {
  const dispatch = useDispatch()
  const { photo, name, gender, intro, birthday } = useSelector(state => state.profile.profile)
  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])
  const history = useHistory()
  // 退出登录
  const logoutFn = async () => {
    // 1.显示弹窗
    const result = await Modal.confirm({
      content: '您确认要退出吗？'
    })
    if (result) {
      // 2.删除token
      dispatch(logout())
      // 3.跳转到登录页
      history.push('/login')
      Toast.show({ content: '退出成功', icon: 'success' })
    }
  }
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar>个人信息</NavBar>
      <div className="wrapper">
        <List className="profile-list">
          <Item
            extra={
              <span className="avatar-wrapper">
                <img src={photo} alt="" />
              </span>
            }
            onClick={() => {}}
          >
            头像
          </Item>
          <Item extra={name} onClick={() => {}}>
            昵称
          </Item>
          <Item extra={<span className={classNames('intro', intro ? 'normal' : '')}>{intro || '未填写'}</span>} onClick={() => {}}>
            简介
          </Item>
        </List>

        <List className="profile-list">
          <Item extra={gender === 0 ? '男' : '女'} onClick={() => {}}>
            性别
          </Item>
          <Item extra={birthday} onClick={() => {}}>
            生日
          </Item>
        </List>
        {/* 底部栏：退出登录按钮 */}
        <div className="logout" onClick={logoutFn}>
          <button className="btn">退出登录</button>
        </div>
      </div>
    </div>
  )
}
