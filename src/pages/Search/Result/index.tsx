import ArticleItem from '@/pages/Home/components/ArticleItem'
import NavBar from '@/components/NavBar'
import {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styles from './index.module.scss'
import {getSearchResult} from '@/store/actions/search'
import { RootState } from '@/store'
import { InfiniteScroll } from 'antd-mobile'

let page = 1
const SearchResult = () => {
  const loaction = useLocation()
  const search = new URLSearchParams(loaction.search)
  const key = search.get('key')!
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getSearchResult(key,1))
  // }, [dispatch, key])
  
  // 获取搜索结果
  const results = useSelector((state: RootState) => state.search.results)
  
  // 是否有更多数据
  const [hasMore, setHasMore] = useState(true)

  
  const loadMore = async () => {
    // 加载更多数据
    if (page>5) {
      // 如果没有timestamp，证明数据加载完了，没有更多了，不需要发送请求
      setHasMore(false)
      return
    }
    await dispatch(getSearchResult(key, page))
    page = page + 1
    
  }
  
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className='navBar'>搜索结果</NavBar>

      <div className="article-list">
        {results.map((item) => {
        return <ArticleItem article={item} key={item.art_id}></ArticleItem>
      })}
      </div>
      {/* 无限加载 */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
    </div>
  )
}

export default SearchResult