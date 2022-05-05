import request from '@/utils/request'
import {  setTokenInfo } from '@/utils/storage'
import { Dispatch } from 'redux'
import {LoginAction} from '../reducers/login'

// 发送验证码
export const sendCode = (mobile:string) => {
  return async () => {
    // 发送请求
    await request({
      url: `/sms/codes/${mobile}`,
      method: 'GET'
    })
  }
}

type Token = {
  token: string
  refresh_token:string
}
export const saveToken = (payload:Token):LoginAction => {
  return {
    type: 'login/token',
    payload
  }
}

// 登录
export const login = (data: { mobile: string; code:string}) => {
  return async (dispatch:Dispatch) => {
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

// logout
export const logout = (payload:Token) => {
  return {
    type: 'login/logout' as const,
    payload
  }
  }
