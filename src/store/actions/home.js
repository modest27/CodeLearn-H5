import request from '@/utils/request'
import { SAVE_CHANNELS, SAVE_ALL_CHANNELS, SAVE_ARTICLE_LIST } from '@/store/action_types/home'
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

// 删除频道
export const delChannel = channel => {
  return async (dispatch, getState) => {
    // 判断有无token，有就发送请求删除
    // 没有token，删除本地
    // 不管有无token，都删除redux中的数据
    const userChannels = getState().home.userChannels
    if (hasToken()) {
      // 有登录，发请求删，以及删redux
      await request.delete('/user/channels/' + channel.id)
      dispatch(saveUserChannels(userChannels.filter(item => item.id !== channel.id)))
    } else {
      // 没登录，删redux，删本地
      const res = userChannels.filter(item => item.id !== channel.id)
      dispatch(saveUserChannels(res))
      setLocalChannels(res)
    }
  }
}

// 添加频道
export const addChannel = channel => {
  return async (dispatch, getState) => {
    const channels = [...getState().home.userChannels, channel]
    if (hasToken()) {
      // 登录了，发请求添加
      await request.patch('/user/channels', { channels: [channel] })
      dispatch(saveUserChannels(channels))
    } else {
      // 没有登录，存redux和本地
      dispatch(saveUserChannels(channels))
      setLocalChannels(channels)
    }
  }
}

// 获取文章列表数据
export const getArticleList = (channelId, timestamp) => {
  return async dispatch => {
    const res = await request({
      method: 'GET',
      url: '/articles',
      params: {
        channel_id: channelId,
        timestamp: timestamp
      }
    })
    dispatch(
      setArticleList({
        channelId,
        timestamp: res.data.pre_timestamp,
        list: res.data.results
      })
    )
  }
}

// 保存文章列表
export const setArticleList = payload => {
  return {
    type: SAVE_ARTICLE_LIST,
    payload
  }
}
