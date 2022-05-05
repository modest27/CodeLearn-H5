import styles from './index.module.scss'
import ArticleItem from '../ArticleItem'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleList } from '@/store/actions/home'
import { PullToRefresh, InfiniteScroll } from 'antd-mobile'
import {RootState} from '@/store'


/**
 * 文章列表组件
 * @param {String} props.channelId 当前文章列表所对应的频道ID
 * @param {String} props.aid 当前 Tab 栏选中的频道ID
 */
type Props = {
  channelId: number
  articleId:number
}
const ArticleList = ({ channelId, articleId }:Props) => {
  const dispatch = useDispatch()
  const current = useSelector((state:RootState) => state.home.articles[channelId])
  const [hasMore, setHasMore] = useState(true)

  // 上拉加载
  const loadMore = async () => {
    if (!current.timestamp) {
      // 如果没有timestamp，证明数据加载完了，没有更多了，不需要发送请求
      setHasMore(false)
      return
    }
    await dispatch(getArticleList(channelId, current.timestamp, true))
  }

  useEffect(() => {
    // 如果该频道有文章数据就不用发请求
    if (current) return
    if (channelId === articleId) {
      dispatch(getArticleList(channelId, Date.now()+''))
    }
  }, [channelId, articleId, dispatch, current])
  // 如果点击的不是当前列表，就不渲染
  if (!current) return null

  // 下拉刷新
  const onRefresh = async () => {
    // 重置为有最新数据状态
    setHasMore(true)
    await dispatch(getArticleList(channelId, Date.now()+''))
  }

  return (
    <div className={styles.root}>
      <div className="articles">
        <PullToRefresh onRefresh={onRefresh}>
          {current.list.map(item => {
            return (
              <div className="article-item" key={item.art_id}>
                <ArticleItem article={item}></ArticleItem>{' '}
              </div>
            )
  })
}
        </PullToRefresh>
        {/* 上拉加载更多 */}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  )
}

export default ArticleList
