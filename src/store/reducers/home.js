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
      const { channelId, list, timestamp, loadMore } = payload

      return {
        ...state,
        articles: {
          ...state.articles,
          [channelId]: {
            timestamp,
            // 如果是loadMore就追加数据，前半部分表示旧数据，否则就覆盖数据
            list: loadMore ? [...state.articles[channelId].list, ...list] : list
          }
        }
      }
    default:
      return state
  }
}
