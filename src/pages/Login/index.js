import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import Input from '@/components/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'

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
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required('手机号不能为空')
        .matches(/^1[3-9]\d{9}$/, '手机号格式错误'),
      code: Yup.string()
        .required('验证码不能为空')
        .matches(/^\d{6}$/, '验证码格式错误')
    })
  })
  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isValid
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
            <Input placeholder="请输入手机号" autoComplete="off" name="mobile" value={mobile} onChange={handleChange} onBlur={handleBlur} maxLength={11}></Input>
            {touched.mobile && errors.mobile ? <div className="validate">{errors.mobile}</div> : null}
          </div>
          <div className="input-item">
            <Input placeholder="请输入验证码" autoComplete="off" name="code" extra="获取验证码" onExtraClick={onExtraClick} value={code} onChange={handleChange} onBlur={handleBlur} maxLength={6}></Input>
            {touched.code && errors.code ? <div className="validate">{errors.code}</div> : null}
          </div>
          {/* 登录按钮 */}
          <button type="submit" className={classNames('login-btn', { disabled: !isValid })} disabled={!isValid}>
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
