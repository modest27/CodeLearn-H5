import request from '@/utils/request'
import { SAVE_USER, SAVE_PROFILE } from '../action_types/profile'

// 保存用户信息
export const saveUser = payload => {
  return {
    type: SAVE_USER,
    payload
  }
}

// 保存用户详细信息
export const saveProfile = payload => {
  return {
    type: SAVE_PROFILE,
    payload
  }
}

// 获取用户信息
export const getUser = () => {
  return async dispatch => {
    const res = await request.get('/user')
    dispatch(saveUser(res.data))
  }
}

// 获取用户详细信息
export const getProfile = () => {
  return async dispatch => {
    const res = await request.get('/user/profile')
    dispatch(saveProfile(res.data))
  }
}
