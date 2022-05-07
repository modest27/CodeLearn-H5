import axios, { AxiosError } from 'axios'
import { Toast } from 'antd-mobile'
import { getTokenInfo, removeTokenInfo, setTokenInfo } from './storage'
import history from './history'
import store from '@/store'
import { logout, saveToken } from '@/store/actions/login'

const baseURL = 'http://geek.itheima.net/v1_0'
const instance = axios.create({
  timeout: 5000,
  baseURL
})

// 配置请求拦截器
instance.interceptors.request.use(
  config => {
    // 获取token
    const token = getTokenInfo().token
    if (token) {
      config.headers!.Authorization = 'Bearer ' + token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 配置响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data
  },
  async (err:AxiosError<{message:string}>) => {
    // 网络问题，没有response
    if (!err.response) {
      Toast.show({
        icon: 'fail',
        content: '网络繁忙，请稍后重试'
      })
      return Promise.reject(err)
    }
    // 网络正常，是其他错误
    const { response, config } = err
    if (response.status !== 401) {
      Toast.show({
        icon: 'fail',
        content: err.response.data.message
      })
      return Promise.reject(err)
    }

    // 网络正常，是401错误，但没有刷新token
    const { refresh_token } = getTokenInfo()
    if (!refresh_token) {
      // 没有token，跳转到登录页
      history.replace({
        pathname: '/login',
        state: {
          from: history.location.pathname
        }
      })
      return Promise.reject(err)
    }

    // 是401，有refresh_token，就刷新token
    // 发请求获取新的token，注意，这里不能使用封装的instance，因为避免又走拦截器
    try {
      // 刷新token成功
      const res = await axios({
        method: 'PUT',
        url: baseURL + '/authorizations',
        headers: {
          Authorization: 'Bearer ' + refresh_token
        }
      })
      // 保存token
      const tokenInfo = {
        token: res.data.data.token,
        refresh_token
      }
      // 保存到redux和localstorage
      store.dispatch(saveToken(tokenInfo))
      setTokenInfo(tokenInfo)
      // 最重要的最后一点，token刷新成功后，将失败的这次请求重新发送一次,从错误对象中拿到config
      return instance(config)
    } catch (err) {
      // 刷新token失败,刷新token过期
      // 移除本地token
      removeTokenInfo()
      store.dispatch(logout({
        token: '',
        refresh_token:''
      }))
      // 跳到登录页
      history.replace({
        pathname: '/login',
        state: {
          from: history.location.pathname
        }
      })
      Toast.show({
        icon: 'fail',
        content: '登录信息失效，请重新登录'
      })
      return Promise.reject(err)
    }
  }
)

export default instance
