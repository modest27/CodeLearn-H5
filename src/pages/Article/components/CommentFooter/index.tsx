import Icon from '@/components/Icon'
import { RootState } from '@/store'
import { likeArticle,collectArticle } from '@/store/actions/article'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

/**
 * 评论工具栏组件
 * @param {Number} props.commentCount 评论数
 * @param {Number} props.attitude 点赞状态：1-已点赞 | 其他-未点赞
 * @param {Number} props.isCollected 评论数
 * @param {String} props.placeholder 输入框中的占位提示信息
 * @param {Function} props.onComment 点击输入框的回调函数
 * @param {Function} props.onShowComment 点击”评论”按钮的回调函数
 * @param {Function} props.onLike 点击“点赞”按钮的回调函数
 * @param {Function} props.onCollected 点击”收藏”按钮的回调函数
 * @param {Function} props.onShare 点击”分享”按钮的回调函数
 * @param {String} props.type  评论类型：normal 普通评论 | reply 回复评论
 */
type Props = {
  goComment?: () => void
  onShare?: () => void
  onShowComment?: () => void
  type?:string
}
const CommentFooter = ({goComment,onShare,onShowComment,type='normal'}:Props) => {
  const { detail } = useSelector((state: RootState) => state.article)
  const dispatch = useDispatch()
  const onLike = async () => {
    await dispatch(likeArticle(detail.art_id, detail.attitude))
  }
  const onCollect = async () => {
    await dispatch(collectArticle(detail.art_id,detail.is_collected))
  }

  return (
    <div className={styles.root}>
      {/* 输入框（是个假的输入框，其实就是个按钮） */}
      <div className="input-btn" onClick={onShowComment}>
        <Icon type="iconbianji" />
        <span>{'去评论'}</span>
      </div>

      {type === 'normal' && (
        <>
          {/* 评论按钮 */}
          <div className="action-item" onClick={goComment}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {true && <span className="bage">{detail.comm_count}</span>}
          </div>

          {/* 点赞按钮 */}
          <div className="action-item" onClick={onLike} >
            <Icon type={detail.attitude===1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            <p>点赞</p>
          </div>
        </>
      )}

      {/* 收藏按钮 */}
      <div className="action-item" onClick={onCollect} >
        <Icon type={detail.is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'} />
        <p>收藏</p>
      </div>

      {/* 分享按钮 */}
      <div className="action-item" onClick={onShare}>
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter