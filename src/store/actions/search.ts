import request from '@/utils/request'
import { RooteThunkAction } from '@/store'
import { SearchAction } from '../reducers/search'
import { setLocalHistories } from '@/utils/storage'

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

// 清空搜索建议内容
export function clearSuggestions():SearchAction{
  return {
    type:'search/clearSuggestions'
  }
}

// 存储搜索记录
export function addSearchList(keyword: string): RooteThunkAction{
  return async (dispatch,getState) => {
    // 获取原来的历史记录
    let histories = getState().search.histories
    // 1.不允许有重复的历史记录，先删除原来有的
    histories = histories.filter(item=>item!==keyword)
    // 添加keyword
    histories = [keyword, ...histories]
    // 2.不允许数组长度超过10
    if (histories.length > 10) {
      histories = histories.slice(0,10)
    }
    // 保存到redux
    dispatch({
      type: 'search/saveHistories',
      payload:histories
    })
    // 保存到本地
    setLocalHistories(histories)
  }
}