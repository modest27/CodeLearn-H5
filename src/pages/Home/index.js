import Tabs from '@/components/Tabs'
import { getUserChannels } from '@/store/actions/home'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

export default function Home() {
  const tabs = useSelector(state => state.home.userChannels)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserChannels())
  }, [dispatch])
  return (
    <div className={styles.root}>
      <Tabs tabs={tabs}></Tabs>
    </div>
  )
}
