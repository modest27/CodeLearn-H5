import request from '@/utils/request'
import { SAVE_CHANNELS, SAVE_ALL_CHANNELS } from '@/store/action_types/home'
import { getLocalChannels, hasToken, setLocalChannels } from '@/utils/storage'

// 获取用户的频道
export const getUserChannels = () => {
  return async dispatch => {
    // 1.判断用户是否登录
    if (hasToken()) {
      const res = await request.get('/user/channels')
      dispatch(saveUserChannels(res.data.channels))
    } else {
      // 2.没有token，从本地获取频道数据
      const channels = getLocalChannels()
      if (channels) {
        // 没有token，但本地有频道数据
        dispatch(saveUserChannels(channels))
      } else {
        // 没有token，而且本地没有频道数据
        const res = await request.get('/user/channels')
        dispatch(saveUserChannels(res.data.channels))
        // 再保存到本地
        setLocalChannels(res.data.channels)
      }
    }
  }
}

// 保存用户频道到redux中
export const saveUserChannels = payload => {
  return {
    type: SAVE_CHANNELS,
    payload
  }
}

// 获取所有频道数据
export const getAllChannels = () => {
  return async dispatch => {
    const res = await request.get('/channels')
    dispatch(saveAllChannels(res.data.channels))
  }
}

// 保存所有频道到redux中
export const saveAllChannels = payload => {
  return {
    type: SAVE_ALL_CHANNELS,
    payload
  }
}
