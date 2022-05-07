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

// 获取评论数据
export function getCommentList(id: string): RooteThunkAction{
  return async dispatch => {
    const res = await request.get('/comments', {
      params: {
        type: 'a',
        source:id
      }
    })
    dispatch({
      type: 'article/saveComment',
      payload:res.data
    })
    
  }
}

// 获取更多评论数据
export function getMoreCommentList(id: string,offset:string): RooteThunkAction{
  return async dispatch => {
    const res = await request.get('/comments', {
      params: {
        type: 'a',
        source: id,
        offset
      }
    })
    dispatch({
      type: 'article/saveMoreComment',
      payload:res.data
    })
  }
}