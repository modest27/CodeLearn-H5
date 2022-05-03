import Icon from '@/components/Icon'
import classnames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import styles from './index.module.scss'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

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
const ArticleItem = ({ article }) => {
  const {
    cover: { type, images },
    title,
    aut_name,
    comm_count,
    pubdate
  } = article

  return (
    <div className={styles.root}>
      <div className={classnames('article-content', type === 0 ? 'none-mt' : '', type === 3 ? 't3' : '')}>
        {/* 标题 */}
        <h3>{title}</h3>

        {/* 封面图 */}
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((image, i) => {
              return (
                <div className="article-img-wrapper" key={i}>
                  <img src={image} alt="" />
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
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem