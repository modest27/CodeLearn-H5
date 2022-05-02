import Icon from '@/components/Icon'
import Input from '@/components/Input'
import NavBar from '@/components/NavBar'
import { getUser } from '@/store/actions/profile'
import { getTokenInfo } from '@/utils/storage'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'

import styles from './index.module.scss'

const Chat = () => {
  const [messageList, setMessageList] = useState([
    // 放两条初始消息
    { type: 'robot', text: '亲爱的用户您好，小智同学为您服务。' },
    { type: 'user', text: '你好' }
  ])
  const photo = useSelector(state => state.profile.user.photo)
  const [msg, setMsg] = useState('')

  let clientRef = useRef(null)
  const dispatch = useDispatch()
  const listRef = useRef(null)

  // sockect.io的连接
  useEffect(() => {
    // 一进来先获取用户信息，解决头像问题
    dispatch(getUser())
    // 创建客户端实例
    clientRef.current = io('http://toutiao.itheima.net', {
      transports: ['websocket'],
      // 在查询字符串参数中传递 token
      query: {
        token: getTokenInfo().token
      }
    })

    // 服务器连接成功事件
    clientRef.current.on('connect', () => {
      // 向聊天记录中添加一条消息
      setMessageList(messageList => [...messageList, { type: 'robot', text: '我是小智，我现在恭候着您的提问' }])
    })

    // 接收到服务器消息事件
    clientRef.current.on('message', e => {
      setMessageList(messageList => [...messageList, { type: 'robot', text: e.msg }])
    })

    return () => {
      // 组件销毁时要关闭连接
      clientRef.current.close()
    }
  }, [dispatch])

  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight - listRef.current.offsetHeight
  }, [messageList])

  const onKeyUp = e => {
    if (e.keyCode !== 13) return
    if (!msg) return
    // 向服务器发送消息
    // 将自己的消息添加到消息数组中
    setMessageList([
      ...messageList,
      {
        type: 'user',
        text: msg
      }
    ])
    clientRef.current.emit('message', {
      msg,
      timestamp: Date.now()
    })
    // 清空消息框消息
    setMsg('')
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header">小智同学</NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={listRef}>
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            // 机器人的消息
            return (
              <div className="chat-item" key={index}>
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            )
          } else {
            // 用户的消息
            return (
              <div className="chat-item user" key={index}>
                <img src={photo} alt="" />
                <div className="message">{item.text}</div>
              </div>
            )
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input className="no-border" placeholder="请描述您的问题" value={msg} onChange={e => setMsg(e.target.value)} onKeyUp={onKeyUp} />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
