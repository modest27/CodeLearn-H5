import Icon from "@/components/Icon"
import NavBar from "@/components/NavBar"
import { RootState } from "@/store"
import { getArtcileDetail,getCommentList } from "@/store/actions/article"
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

const Article = () => {

  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const { detail } = useSelector((state: RootState) => state.article)
  // 是否显示顶部信息
  const [isShowAuthor, setIsShowAuthor] = useState(false)
  const authorRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
     // 配置 highlight.js
  hljs.configure({
    // 忽略未经转义的 HTML 字符
    ignoreUnescapedHTML: true
  })

    // 获取所有code标签
    const codes = document.querySelectorAll('.dg-html code')
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
                <NoComment></NoComment>
            </div>
          </>
        )}
      </div>

    </div>
  )
}

export default Article