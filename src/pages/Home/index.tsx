import Icon from '@/components/Icon'
import Tabs from '@/components/Tabs'
import { getAllChannels, getUserChannels } from '@/store/actions/home'
import { Popup } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import Channels from './components/channels'
import ArticleList from './components/ArticleList/idnex'
import MoreAction from './components/MoreAction'
import {RootState} from '@/store'
import { useHistory } from 'react-router-dom'

export default function Home() {
  const tabs = useSelector((state:RootState) => state.home.userChannels)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(getUserChannels())
    dispatch(getAllChannels())
  }, [dispatch])
  const [open, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
  }

  // 控制高亮
  const [active, setActive] = useState(0)

  const changeActive = (e:number) => setActive(e)
  return (
    <div className={styles.root}>
      <Tabs tabs={tabs} index={active} onChange={changeActive}>
        {/* 放对应数量的ArticleList */}
        {tabs.map(item => <ArticleList key={item.id} channelId={item.id} articleId={tabs[active].id}></ArticleList>
        )}
      </Tabs>
      {/* 频道 Tab 栏右侧的两个图标按钮：搜索、频道管理 */}
      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={()=>history.push('/search')} />
        <Icon type="iconbtn_channel" onClick={() => setOpen(true)} />
      </div>
      {/* 频道管理组件 */}
      <Popup visible={open} position="left" bodyStyle={{ width: '100vw' }}>
        <Channels onClose={onClose} index={active} onChange={changeActive}></Channels>
      </Popup>
      {/* 举报弹层 */}
      <MoreAction></MoreAction>
    </div>
  )
}
