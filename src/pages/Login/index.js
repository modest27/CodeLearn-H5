import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import Input from '@/components/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { login, sendCode } from '@/store/actions/login'
import { Toast } from 'antd-mobile'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'

export default function Login() {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const [time, setTime] = useState(0)
  const onExtraClick = async () => {
    if (time > 0) return
    // 先对手机号进行验证
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formik.setTouched({
        mobile: true
      })
      return
    }

    await dispatch(sendCode(mobile))
    Toast.show({
      icon: 'success',
      content: '获取验证码成功'
    })

    // 开启倒计时
    setTime(60)
    let timeId = setInterval(() => {
      // 当我们每次都需要获取最新的状态，需要写成箭头函数的形式
      setTime(time => {
        if (time === 1) {
          clearInterval(timeId)
        }
        return time - 1
      })
    }, 1000)
  }

  const formik = useFormik({
    initialValues: {
      mobile: '13911111111',
      code: '246810'
    },
    async onSubmit(values) {
      await dispatch(login(values))
      Toast.show({
        icon: 'success',
        content: '登录成功'
      })
      // 跳转到首页
      if (location.from) {
        history.push(location.from.pathname)
      } else {
        history.push('/home')
      }
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
            <Input placeholder="请输入验证码" autoComplete="off" name="code" extra={time === 0 ? '获取验证码' : time + ' s后获取'} onExtraClick={onExtraClick} value={code} onChange={handleChange} onBlur={handleBlur} maxLength={6}></Input>
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
