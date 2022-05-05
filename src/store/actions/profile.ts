import request from '@/utils/request'
import { User, Profile,ProfileAction } from '../reducers/profile'
import {RooteThunkAction} from '../index'


// 保存用户信息
export const saveUser = (payload:User):ProfileAction => {
  return {
    type: 'profile/user',
    payload
  }
}

// 保存用户详细信息
export const saveProfile = (payload:Profile):ProfileAction => {
  return {
    type: 'profile/profile',
    payload
  }
}

// 获取用户信息
export const getUser = ():RooteThunkAction => {
  return async (dispatch) => {
    const res = await request.get('/user')
    dispatch(saveUser(res.data))
  }
}

// 获取用户详细信息
export const getProfile = ():RooteThunkAction => {
  return async (dispatch) => {
    const res = await request.get('/user/profile')
    dispatch(saveProfile(res.data))
  }
}
