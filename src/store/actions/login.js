import request from '@/utils/request'
import { setTokenInfo } from '@/utils/storage'

// 发送验证码
export const sendCode = mobile => {
  return async () => {
    // 发送请求
    await request({
      url: `/sms/codes/${mobile}`,
      method: 'GET'
    })
  }
}

export const saveToken = payload => {
  return {
    type: 'login/token',
    payload
  }
}

// 登录
export const login = data => {
  return async dispatch => {
    const res = await request({
      method: 'POST',
      url: '/authorizations',
      data
    })
    // 保存token到redux中
    dispatch(saveToken(res.data))
    // 同时保存到本地
    setTokenInfo(res.data)
  }
}
