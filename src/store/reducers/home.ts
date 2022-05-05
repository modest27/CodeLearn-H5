export type Channel = {
  id: number
  name:string
}

export type Article = {
  art_id: string
  title: string
  aut_id: string
  aut_name: string
  comm_count: string
  pubdate: string
  cover: {
    type: string
    images:string[]
  }
}

export type ArticlePayload = {
  channelId: number;
  timestamp: string;
  list: Article[];
  loadMore: boolean;
}

export type Articles = {
  [index: number]: {
    timestamp: string
    list:Article[]
  }
}

type HomeType = {
  userChannels: Channel[]
  allChannels: Channel[]
  articles:Articles
}

export type HomeAction = {
  type: 'home/saveChannels'
  payload:Channel[]
} | {
  type: 'home/saveAllChannels'
  payload:Channel[]
} | {
  type: '/home/saveArticleList'
  payload: {
    channelId:number
    timestamp: string
    list: Article[]
    loadMore:boolean
  }
}

const initValue:HomeType = {
  userChannels: [],
  allChannels: [],
  articles: {} // 存储所有文章列表
} as HomeType

export default function reducer(state = initValue, action:HomeAction) {
  // const { type, payload } = action
  switch (action.type) {
    case 'home/saveChannels':
      return {
        ...state,
        userChannels: action.payload
      }
    case 'home/saveAllChannels':
      return {
        ...state,
        allChannels: action.payload
      }
    case '/home/saveArticleList':
      const { channelId, list, timestamp, loadMore } = action.payload

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
