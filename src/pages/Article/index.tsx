import Icon from "@/components/Icon"
import NavBar from "@/components/NavBar"
import { RootState } from "@/store"
import { getArtcileDetail,getCommentList,getMoreCommentList } from "@/store/actions/article"
import classNames from "classnames"
import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"
import ContentLoader from "react-content-loader"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import styles from './index.module.scss'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import NoComment from "./components/NoComment"
import CommentItem from "./components/CommentItem"
import {InfiniteScroll, Popup} from 'antd-mobile'
import CommentFooter from "./components/CommentFooter"
import Sticky from "@/components/Sticky"
import Share from "./components/Share"
import CommentInput from "./components/CommentInput"

const Article = () => {

  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const { detail,comment } = useSelector((state: RootState) => state.article)
  // 是否显示顶部信息
  const [isShowAuthor, setIsShowAuthor] = useState(false)
  const authorRef = useRef<HTMLDivElement>(null)
  const commentRef = useRef<HTMLDivElement>(null)
  const hasMore = comment.end_id !== comment.last_id
  // 判断评论还有没有数据
  const loadMore = async () => {
    if(!hasMore) return
   await dispatch(getMoreCommentList(id,comment.last_id))
  }

  // 分享弹层
  const [share, setShare] = useState(false)
  
  // 评论弹层
  const [showComment, setShowComment] = useState({
    visible:false
  })
  const closeComment = () => {
    setShowComment({
      visible:false
    })
  }
  
  useEffect(() => {
     // 配置 highlight.js
  hljs.configure({
    // 忽略未经转义的 HTML 字符
    ignoreUnescapedHTML: true
  })

    // 获取所有code标签
    const codes = document.querySelectorAll('.dg-html pre > code')
    codes.forEach(el => {
      hljs.highlightElement(el as HTMLElement)
    })
  },[detail])

  useEffect(() => {
    dispatch(getArtcileDetail(id))
  }, [dispatch, id])

  useEffect(() => {
    const onScroll = () => {
      const rect = authorRef.current?.getBoundingClientRect()!
     
      if (rect.top <= 0) {
        setIsShowAuthor(true)
      } else {
        setIsShowAuthor(false)
      }
      
    }

    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll',onScroll)
    }
  }, [])
  
  // 发送请求-获取评论数据
  useEffect(() => {
    dispatch(getCommentList(id))
  },[dispatch,id])
  
  // 跳转到评论处
  const isShowComment = useRef(false)
  const goComment = () => {
    if (isShowComment.current) {
      window.scrollTo(0,0)
    } else {
      window.scrollTo(0,commentRef.current!.offsetTop)
    }
    isShowComment.current = !isShowComment.current
  }

  
  

  return (
    <div className={styles.root}>
      <div className="root-wrapper">

        {/* 顶部导航栏 */}
        <NavBar
          className='navBar'
          onLeftClick={() => history.go(-1)}
          extra={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
      {isShowAuthor?   <div className="nav-author">
    <img src={detail.aut_photo} alt="" />
    <span className="name">{detail.aut_name}</span>
    <span className={classNames('follow', detail.is_followed ? 'followed' : '')}>
      {detail.is_followed ? '已关注' : '关注'}
    </span>
  </div>:''}
        </NavBar>

        {false ? (
          // 数据正在加载时显示的骨架屏界面
          <ContentLoader
            speed={2}
            width={375}
            height={230}
            viewBox="0 0 375 230"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            {/* https://skeletonreact.com/ */}
            <rect x="16" y="8" rx="3" ry="3" width="340" height="10" />
            <rect x="16" y="26" rx="0" ry="0" width="70" height="6" />
            <rect x="96" y="26" rx="0" ry="0" width="50" height="6" />
            <rect x="156" y="26" rx="0" ry="0" width="50" height="6" />
            <circle cx="33" cy="69" r="17" />
            <rect x="60" y="65" rx="0" ry="0" width="45" height="6" />
            <rect x="304" y="65" rx="0" ry="0" width="52" height="6" />
            <rect x="16" y="114" rx="0" ry="0" width="340" height="15" />
            <rect x="263" y="208" rx="0" ry="0" width="94" height="19" />
            <rect x="16" y="141" rx="0" ry="0" width="340" height="15" />
            <rect x="16" y="166" rx="0" ry="0" width="340" height="15" />
          </ContentLoader>
        ) : (
          // 数据加载完成后显示的实际界面
          <>
            <div className="wrapper">
              <div className="article-wrapper">

                {/* 文章描述信息栏 */}
                <div className="header">
                  <h1 className="title">{detail.title}</h1>

                  <div className="info">
                    <span>{detail.pubdate}</span>
                    <span>{detail.read_count} 阅读</span>
                    <span>{detail.comm_count} 评论</span>
                  </div>

                  <div className="author" ref={authorRef}>
                    <img src={detail.aut_photo} alt="" />
                    <span className="name">{detail.aut_name}</span>
                      <span className={classNames('follow',{followed:detail.is_followed})}>{ detail.is_followed? '已关注':'关注' }</span>
                  </div>
                </div>

                {/* 文章正文内容区域 */}
                <div className="content">
                  <div className="content-html dg-html" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(detail.content)}}></div>
                  <div className="date">发布文章时间：{dayjs(detail.pubdate).format('YYYY-MM-DD')}</div>
                </div>

                </div>
                
              {/* 文章评论区 */}
           <div className="comment">
                 {/* 评论总览信息 */}
                  <Sticky top={46}>
                    {<div className="comment-header" ref={commentRef}>
                    <span>全部评论（{detail.comm_count}）</span>
                    <span>{detail.like_count} 点赞</span>
                    </div>}
                  </Sticky>
                  {detail.comm_count === 0 ? <NoComment></NoComment> : comment.results?.map(item => {
                    return <CommentItem key={item.com_id} comment={item}></CommentItem>
                  })}
                  <InfiniteScroll hasMore={hasMore} loadMore={loadMore}></InfiniteScroll>
                  </div>
              </div>
              <CommentFooter goComment={goComment} onShare={() => setShare(true)} onShowComment={()=>setShowComment({visible:true})}></CommentFooter>
          </>
        )}
      </div>
      {/* 分享的弹层 */}
      <Popup
              visible={share}
              onMaskClick={() => {
                setShare(false)
              }}
              bodyStyle={{ height: '44vh' }}
            >
              <Share onClose={()=>setShare(false)}></Share>
      </Popup>
      {/* 添加评论的弹层 */}
      <Popup
              visible={showComment.visible}
              // onMaskClick={() => {
              //   setShare(false)
              // }}
              bodyStyle={{ height: '100vh' }}
            >
              <CommentInput onClose={closeComment} articleId={detail.art_id}></CommentInput>
      </Popup>
    </div>
  )
}

export default Article