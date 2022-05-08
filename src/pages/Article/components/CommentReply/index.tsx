import NavBar from '@/components/NavBar'
import NoComment from '@/pages/Article/components/NoComment'
import { Comment } from '@/store/reducers/article'
import CommentFooter from '../CommentFooter'
import CommentItem from '../CommentItem'
import styles from './index.module.scss'

/**
 * 回复评论界面组件
 * @param {Object} props.originComment 原评论数据 
 * @param {String} props.articleId 文章ID 
 * @param {Function} props.onClose 关闭抽屉的回调函数
 */
type Props = {
  articleId?: string
  onClose?: () => void
  originComment:Comment
}
const CommentReply = ({ articleId, onClose,originComment }:Props) => {


  return (
    <div className={styles.root}>
      <div className="reply-wrapper">

        {/* 顶部导航栏 */}
        <NavBar className="transparent-navbar" onLeftClick={onClose}>
          <div>{originComment.reply_count}条回复</div>
        </NavBar>

        {/* 原评论信息 */}
        <div className="origin-comment">
          <CommentItem comment={originComment} ></CommentItem>
        </div>

        {/* 回复评论的列表 */}
        <div className="reply-list">
          <div className="reply-header">全部回复</div>

         
            <NoComment />
       
        </div>

        {/* 评论工具栏，设置 type="reply" 不显示评论和点赞按钮 */}
        <CommentFooter
        
        />
      </div>

      {/* 评论表单抽屉 */}
     
    </div>
  )
}

export default CommentReply