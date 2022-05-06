import request from '@/utils/request'
import {RooteThunkAction} from '@/store'

// 获取推荐列表
export function getSuggestList(keyword:string):RooteThunkAction {
  return async dispatch => {
    const res = await request({
      url: '/suggestion',
      method: 'GET',
      params: {
        q:keyword
      }
    })
    dispatch({
      type: 'search/saveSuggestions',
      payload:res.data.options
    })

  }
}