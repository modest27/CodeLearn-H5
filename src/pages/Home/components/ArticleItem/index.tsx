import Icon from '@/components/Icon'
import classnames from 'classnames'
import dayjs from 'dayjs'
import styles from './index.module.scss'
import Img from '@/components/Img'
import { useSelector } from 'react-redux'
import {RootState} from '@/store'
import { useHistory } from 'react-router-dom'




/**
 * 文章列表项组件
 * @param {String} articleId 文章ID
 * @param {Number} coverType 封面类型：0-无图|1-单图|3-三图
 * @param {Array} coverImages 封面图片
 * @param {String} title 标题
 * @param {String} authorName 作者
 * @param {Number} commentCount 回复数
 * @param {String} publishDate 发布日期
 */
const ArticleItem = ({ article }:any) => {
  const {
    cover: { type, images },
    title,
    aut_name,
    comm_count,
    pubdate
  } = article

  const isLogin = useSelector((state: RootState) => !!state.login.token)
  
  const history = useHistory()

  return (
    <div className={styles.root} onClick={()=>history.push('/article/'+article.art_id)}>
      <div className={classnames('article-content', type === 0 ? 'none-mt' : '', type === 3 ? 't3' : '')}>
        {/* 标题 */}
        <h3>{title}</h3>

        {/* 封面图 */}
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((image:any, i:number) => {
              return (
                <div className="article-img-wrapper" key={i}>
                  <Img src={image}  />
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* 底部信息栏 */}
      <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs().from(pubdate)}</span>
        <span className="close">{isLogin && <Icon type="iconbtn_essay_close" />}</span>
      </div>
    </div>
  )
}

export default ArticleItem
