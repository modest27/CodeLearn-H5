import { RooteThunkAction } from "..";
import request from '@/utils/request'
import { Toast } from 'antd-mobile'


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

// 点赞
export function likeArticle(id: string,attitude:number): RooteThunkAction{
  return async dispatch => {
    if (attitude === 1) {
      // 取消点赞
      await request.delete('/article/likings/' + id)
    Toast.show({icon:'success',content:'取消成功',duration:1000})
      
    } else {
      // 点赞
      await request.post('/article/likings', { target: id })
    Toast.show({icon:'success',content:'点赞成功',duration:1000})
      
    }
    // 更新
    await dispatch(getArtcileDetail(id))
  }
}

// 收藏
export function collectArticle(id: string, is_collected: boolean): RooteThunkAction{
  return async dispatch => {
    if (is_collected) {
      // 取消收藏
      await request.delete('/article/collections/' + id)
      Toast.show({icon:'success',content:'取消成功',duration:1000})
    } else {
      // 收藏
      await request.post('/article/collections', { target: id })
      Toast.show({icon:'success',content:'收藏成功',duration:1000})
    }
    // 更新
    await dispatch(getArtcileDetail(id))
  }
}

// 发表评论
export function addComment(articleId: string, content: string): RooteThunkAction{
  return async dispatch => {
   const res = await request.post('/comments', {
      target: articleId,
      content
     })
    dispatch({
      type: 'article/saveNewComment',
      payload:res.data.new_obj
    })
     // 更新
     await dispatch(getArtcileDetail(articleId))
  }
}