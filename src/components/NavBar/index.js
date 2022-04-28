import React from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

// 方法1： import { withRouter } from 'react-router-dom'

function NavBar({ children, extra }) {
  const history = useHistory()
  const back = () => {
    // 返回上一页
    history.go(-1)
  }

  return (
    <div className={styles.root}>
      {/* 后退按钮 */}
      <div className="left">
        <Icon type="iconfanhui" onClick={back} />
      </div>
      {/* 居中标题 */}
      <div className="title">{children}</div>

      {/* 右侧内容 */}
      <div className="right">{extra}</div>
    </div>
  )
}

export default NavBar
