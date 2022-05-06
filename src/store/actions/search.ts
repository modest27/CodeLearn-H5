import request from '@/utils/request'
import { RooteThunkAction } from '@/store'

type SuggestListRes = {
  options:string[]
}

// 获取推荐列表
export function getSuggestList(keyword:string):RooteThunkAction {
  return async dispatch => {
    const res = await request.get<SuggestListRes>('/suggestion?q=' + keyword)
    let options = res.data.options
    if (!options[0]) {
      options = []
    }
    dispatch({
      type: 'search/saveSuggestions',
      payload: options
    })

  }
}