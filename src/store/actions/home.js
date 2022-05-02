import request from '@/utils/request'
import { SAVE_CHANNELS } from '@/store/action_types/home'

// 获取用户的频道
export const getUserChannels = () => {
  return async dispatch => {
    const res = await request.get('/user/channels')
    dispatch(saveUserChannels(res.data.channels))
  }
}

// 保存用户频道到redux中
export const saveUserChannels = payload => {
  return {
    type: SAVE_CHANNELS,
    payload
  }
}
