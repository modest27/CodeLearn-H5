import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import Input from '@/components/Input'
import { useFormik } from 'formik'

export default function Login() {
  const onExtraClick = () => {
    console.log('哈哈')
  }

  const formik = useFormik({
    initialValues: {
      mobile: '13911111111',
      code: '123456'
    },
    onSubmit: values => {
      console.log(values)
    }
  })
  const {
    values: { mobile, code },
    handleChange,
    handleSubmit
  } = formik
  return (
    <div className={styles.root}>
      {/* 顶部导航 */}
      <NavBar>登录</NavBar>
      {/* 内容 */}
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input placeholder="请输入手机号" autoComplete="off" name="mobile" value={mobile} onChange={handleChange}></Input>
            {/* <div className="validate">手机号验证错误信息</div> */}
          </div>
          <div className="input-item">
            <Input placeholder="请输入验证码" autoComplete="off" name="code" extra="获取验证码" onExtraClick={onExtraClick} value={code} onChange={handleChange}></Input>
            {/* <div className="validate">验证码验证错误信息</div> */}
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
