import axios from 'axios'
import { Toast } from 'antd-mobile'

const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://geek.itheima.net/v1_0'
})

// 配置请求拦截器
instance.interceptors.request.use(
  config => {
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
  err => {
    if (err.response) {
      Toast.show({
        icon: 'fail',
        content: err.response.data.message
      })
    } else {
      Toast.show({
        icon: 'fail',
        content: '网络繁忙，请稍后重试'
      })
    }
    return Promise.reject(err)
  }
)

export default instance
