import NavBar from '@/components/NavBar'
import NoComment from '@/pages/Article/components/NoComment'
import { Comment } from '@/store/reducers/article'
import  request  from '@/utils/request'
import { InfiniteScroll, Popup } from 'antd-mobile'
import { useEffect, useState } from 'react'
import CommentFooter from '../CommentFooter'
import CommentInput from '../CommentInput'
import CommentItem from '../CommentItem'
import styles from './index.module.scss'

/**
 * 回复评论界面组件
 * @param {Object} props.originComment 原评论数据 
 * @param {String} props.articleId 文章ID 
 * @param {Function} props.onClose 关闭抽屉的回调函数
 */
type Props = {
  articleId: string
  onClose?: () => void
  originComment:Comment
}
const CommentReply = ({ articleId, onClose, originComment }: Props) => {
  const [replyList,setReplyList] = useState({
    end_id: '',
    last_id: '',
    results: [] as Comment[],
    total_count: 0
  })
  //获取文章回复列表
  useEffect(() => {
    const fetchData = async () => {
      const res = await request.get('/comments', {
        params: {
          type: 'c',
          source:originComment.com_id
        }
      })
      setReplyList(res.data)
    }
    fetchData()
  },[originComment])

  const hasMore = replyList.end_id !== replyList.last_id
  const loadMore = async () => {
    const res = await request.get('/comments', {
      params: {
        type: 'c',
        source: originComment.com_id,
        offset:replyList.last_id
      }
    })
    setReplyList({
      ...res.data,
      results:[...replyList.results,...res.data.results]
    })
  }

  const [drawerStatus,setDrawerState] = useState({
    visible:false
  })
  const onDrawerClose = () => {
    setDrawerState({
      visible:false
    })
  }

  const onAddReply = async (content: string) => {
    const res = await request.post('/comments', {
      target: originComment.com_id,
      content,
      art_id: articleId
    })
    setReplyList({
      ...replyList,
      results:[res.data.new_obj,...replyList.results]
    })
      
  }

  return (
    <div className={styles.root}>
      <div className="reply-wrapper">

        {/* 顶部导航栏 */}
        <NavBar className="transparent-navbar" onLeftClick={onClose}>
          <div>{originComment.reply_count}条回复</div>
        </NavBar>

        {/* 原评论信息 */}
        <div className="origin-comment">
          <CommentItem comment={originComment} type='reply'></CommentItem>
        </div>

        {/* 回复评论的列表 */}
        <div className="reply-list">
          <div className="reply-header">全部回复</div>
          {replyList.total_count === 0 ? <NoComment /> : (replyList.results.map(item => {
             return <CommentItem comment={item} key={item.aut_id} type='reply'></CommentItem>
            }))}
         
            
       <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
        </div>

        {/* 评论工具栏，设置 type="reply" 不显示评论和点赞按钮 */}
        <CommentFooter
          type='reply'
          onShowComment={()=>setDrawerState({visible:true})}
        />
      </div>

      {/* 评论表单抽屉 */}
      
       <Popup
              visible={drawerStatus.visible}
              // onMaskClick={() => {
              //   setShare(false)
              // }}
              bodyStyle={{ height: '100vh' }}
            >
              <CommentInput onClose={onDrawerClose} articleId={articleId} name={originComment.aut_name} onAddReply={onAddReply}></CommentInput>
      </Popup>
    </div>
  )
}

export default CommentReply