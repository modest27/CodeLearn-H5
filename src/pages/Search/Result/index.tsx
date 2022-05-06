// import ArticleItem from '@/pages/Home/components/ArticleItem'
import NavBar from '@/components/NavBar'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styles from './index.module.scss'
import {getSearchResult} from '@/store/actions/search'

const SearchResult = () => {
  const loaction = useLocation()
  const search = new URLSearchParams(loaction.search)
  const key = search.get('key')!
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSearchResult(key,1))
  },[dispatch,key])
  
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar >搜索结果</NavBar>

      <div className="article-list">
       文章列表
      </div>
    </div>
  )
}

export default SearchResult