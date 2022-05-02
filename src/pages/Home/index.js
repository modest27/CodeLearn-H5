import Icon from '@/components/Icon'
import Tabs from '@/components/Tabs'
import { getAllChannels, getUserChannels } from '@/store/actions/home'
import { Popup } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import Channels from './components/channels'

export default function Home() {
  const tabs = useSelector(state => state.home.userChannels)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserChannels())
    dispatch(getAllChannels())
  }, [dispatch])
  const [open, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
  }
  return (
    <div className={styles.root}>
      <Tabs tabs={tabs}></Tabs>
      {/* 频道 Tab 栏右侧的两个图标按钮：搜索、频道管理 */}
      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" onClick={() => setOpen(true)} />
      </div>
      {/* 频道管理组件 */}
      <Popup visible={open} position="left" bodyStyle={{ width: '100vw' }}>
        <Channels onClose={onClose}></Channels>
      </Popup>
    </div>
  )
}
