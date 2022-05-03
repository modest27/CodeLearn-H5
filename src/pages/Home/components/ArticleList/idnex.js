import styles from './index.module.scss'
import ArticleItem from '../ArticleItem'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getArticleList } from '@/store/actions/home'

/**
 * 文章列表组件
 * @param {String} props.channelId 当前文章列表所对应的频道ID
 * @param {String} props.aid 当前 Tab 栏选中的频道ID
 */
const ArticleList = ({ channelId, articleId }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (channelId === articleId) {
      dispatch(getArticleList(channelId, Date.now()))
    }
  }, [channelId, articleId, dispatch])
  const list = []
  return (
    <div className={styles.root}>
      <div className="articles">
        {list.map(item => {
          return (
            <div className="article-item" key={item.art_id}>
              <ArticleItem article={item}></ArticleItem>{' '}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ArticleList
