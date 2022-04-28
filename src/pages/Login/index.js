import NavBar from '@/components/NavBar'
import styles from './index.module.scss'

export default function Login() {
  return (
    <div className={styles.root}>
      {/* 顶部导航 */}
      <NavBar>登录</NavBar>
      {/* 内容 */}
      <div className="content">
        <h3>短信登录</h3>
        <form>
          <div className="input-item">
            <input type="text" />
            <div className="validate">手机号验证错误信息</div>
          </div>
          <div className="input-item">
            <input type="text" />
            <div className="validate">验证码验证错误信息</div>
          </div>
          {/* 登录按钮 */}
          <button type="submit" className="login-btn">
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
