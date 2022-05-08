import NavBar from '@/components/NavBar'
import { addComment } from '@/store/actions/article'
import { Toast } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './index.module.scss'

/**
 * @param {String} props.id 评论ID
 * @param {String} props.name 评论人姓名 
 * @param {Function} props.onClose 关闭评论表单时的回调函数
 * @param {Function} props.onComment 发表评论成功时的回调函数
 * @param {String} props.articleId 文章ID 
 */

type Props = {
  onClose: () => void
  articleId: string
  name?: string
  onAddReply?:(content:string)=>void
}
const CommentInput = ({ onClose,articleId,name,onAddReply }:Props) => {
  // 输入框内容
  const [value, setValue] = useState('')

  // 输入框引用
  const txtRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
		// 输入框自动聚焦
    setTimeout(() => {
      txtRef.current!.focus()
    }, 600)
  }, [])

  // 发表评论
  const dispatch = useDispatch()
  const onSendComment = async () => {
    if (!value) return
    // 判断是回复还是评论
    if (name) {
      // 回复
      onAddReply && onAddReply(value)
      setValue('')
    Toast.show({icon:'success',content:'回复成功',duration:1000})
    } else {
        // 发表评论
    await dispatch(addComment(articleId, value))
    setValue('')
    Toast.show({icon:'success',content:'发表成功',duration:1000})
    }
  
    onClose()
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className='nav'
        onLeftClick={onClose}
        extra={
          <span className="publish" onClick={onSendComment}>发表</span>
        }
      >
        {name ? '回复评论' : '评论文章'}
      </NavBar>

      <div className="input-area">
         {/* 回复别人的评论时显示：@某某 */}
         {name && <div className="at">@{name}:</div>}
      
        {/* 评论内容输入框 */}
        <textarea
          ref={txtRef}
          placeholder="说点什么~"
          rows={10}
          value={value}
          onChange={e => setValue(e.target.value.trim())}
        />
      </div>
    </div>
  )
}

export default CommentInput