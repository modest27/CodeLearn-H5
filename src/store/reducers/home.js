import { SAVE_CHANNELS, SAVE_ALL_CHANNELS, SAVE_ARTICLE_LIST } from '../action_types/home'

const initValue = {
  userChannels: [],
  allChannels: [],
  articles: {} // 存储所有文章列表
}
export default function reducer(state = initValue, action) {
  const { type, payload } = action
  switch (type) {
    case SAVE_CHANNELS:
      return {
        ...state,
        userChannels: payload
      }
    case SAVE_ALL_CHANNELS:
      return {
        ...state,
        allChannels: payload
      }
    case SAVE_ARTICLE_LIST:
      return {
        ...state,
        articles: {
          ...state.articles,
          [payload.channelId]: {
            timestamp: payload.timestamp,
            list: payload.list
          }
        }
      }
    default:
      return state
  }
}
