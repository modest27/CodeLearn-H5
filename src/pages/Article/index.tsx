import Icon from "@/components/Icon"
import NavBar from "@/components/NavBar"
import { getArtcileDetail } from "@/store/actions/article"
import { useEffect } from "react"
import ContentLoader from "react-content-loader"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import styles from './index.module.scss'

const Article = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArtcileDetail(id))
  },[dispatch,id])

  return (
    <div className={styles.root}>
      <div className="root-wrapper">

        {/* 顶部导航栏 */}
        <NavBar
          onLeftClick={() => history.go(-1)}
          extra={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
         哈哈哈
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
                  <h1 className="title">{"测试文字1234"}</h1>

                  <div className="info">
                    <span>{'2020-10-10'}</span>
                    <span>{10} 阅读</span>
                    <span>{10} 评论</span>
                  </div>

                  <div className="author">
                    <img src={''} alt="" />
                    <span className="name">{'张三'}</span>
                    <span className="follow">关注</span>
                  </div>
                </div>

                {/* 文章正文内容区域 */}
                <div className="content">
                  <div className="content-html dg-html">测试内容123</div>
                  <div className="date">发布文章时间：{'2020-10-10'}</div>
                </div>

              </div>
            </div>
          </>
        )}
      </div>

    </div>
  )
}

export default Article