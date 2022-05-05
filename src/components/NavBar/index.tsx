import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import {ReactElement} from 'react'

// 方法1： import { withRouter } from 'react-router-dom'

type Props = {
  children: string | ReactElement
  extra?: string | ReactElement
  className?: string
  onLeftClick?:()=>void
}
function NavBar({ children, extra, onLeftClick, className }:Props) {
  const history = useHistory()
  const back = () => {
    // 返回上一页
    if (onLeftClick) {
      onLeftClick()
    } else {
      history.go(-1)
    }
  }

  return (
    <div className={classNames(styles.root, className)}>
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
