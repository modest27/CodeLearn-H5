type Detail = {
  art_id: string;
  attitude: number;
  aut_id: string;
  aut_name: string;
  aut_photo: string;
  comm_count: number;
  content: string;
  is_collected: boolean;
  is_followed: boolean;
  like_count: number;
  pubdate: string;
  read_count: number;
  title: string;
}

type ArticleType = {
  detail:Detail
}

export type ArticleAction = {
  type: 'article/saveDetail',
  payload:Detail
}

const initValue:ArticleType = {
  // 存储文章详情数据
  detail:{}
} as ArticleType

export default function article(state = initValue, action: ArticleAction) {
  if (action.type === 'article/saveDetail') {
    return {
      ...state,
      detail:action.payload
    }
  }
  return state
}