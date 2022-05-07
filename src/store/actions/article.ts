import { RooteThunkAction } from "..";
import request from '@/utils/request'

export function getArtcileDetail(id:string): RooteThunkAction{
  return async dispatch => {
    const res = await request.get('/articles/' + id)
    dispatch({
      type: 'article/saveDetail',
      payload:res.data
    })
    
  }
}