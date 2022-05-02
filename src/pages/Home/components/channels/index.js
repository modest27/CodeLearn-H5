import Icon from '@/components/Icon'
import { delChannel } from '@/store/actions/home'
import classNames from 'classnames'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

/**
 * 频道管理组件
 * @param {Number} props.tabActiveIndex 用户选中的频道的索引
 * @param {Function} props.onClose 关闭频道管理抽屉时的回调函数
 * @param {Function} props.onChannelClick 当点击频道列表中的某个频道时的会带哦函数
 */
const Channels = ({ tabActiveIndex, onClose, onChange, index }) => {
  const userChannels = useSelector(state => state.home.userChannels)
  // 推荐频道
  const recommendChannels = useSelector(state => {
    const { userChannels, allChannels } = state.home
    return allChannels.filter(item => {
      // 如果在用户频道里有的就不要
      return userChannels.findIndex(v => v.id === item.id) === -1
    })
  })

  // 切换
  const changeChannel = i => {
    // 如果是编辑状态，不允许跳转
    if (editing) return
    // 传出去下标高亮
    onChange(i)
    onClose()
  }

  // 编辑状态
  const [editing, setEditing] = useState(false)

  const dispatch = useDispatch()

  // 删除频道
  const del = channel => {
    dispatch(delChannel(channel))
  }

  return (
    <div className={styles.root}>
      {/* 顶部栏：带关闭按钮 */}
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div className={classNames('channel-item', { edit: editing })}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">{editing ? '点击删除频道' : '点击进入频道'}</span>
            <span className="channel-item-edit" onClick={() => setEditing(!editing)}>
              {editing ? '保存' : '编辑'}
            </span>
          </div>

          <div className="channel-list">
            {userChannels.map((item, i) => {
              return (
                <span className={classNames('channel-list-item', { selected: index === i })} key={item.id} onClick={() => changeChannel(i)}>
                  {item.name}
                  <Icon type="iconbtn_tag_close" onClick={() => del(item)} />
                </span>
              )
            })}
          </div>
        </div>

        {/* 推荐的频道列表 */}
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {recommendChannels.map(item => {
              return (
                <span className="channel-list-item" key={item.id}>
                  + {item.name}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
