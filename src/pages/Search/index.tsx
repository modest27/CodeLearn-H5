import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import classnames from 'classnames'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import { getSuggestList,clearSuggestions } from '@/store/actions/search'
import { RootState } from '@/store'


const Search = () => {
  const history = useHistory()
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()
  const suggestions = useSelector((state: RootState) => state.search.suggestions)
  // 是否显示搜索
  const [isSearching,setIsSeaarching] = useState(false)
  
  let timerRef = useRef(-1)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let text = e.target.value
    setKeyword(text)
    clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      if (text) {
        setIsSeaarching(true)
      dispatch(getSuggestList(text))
      } else {
        setIsSeaarching(false)
      }
    },500)
  }

  useEffect(() => {
    return ()=> {
     window.clearTimeout(timerRef.current)
    }
  }, [])
  
  // 让字符串中指定内容高亮
  const hightLight = (str: string, key: string) => {
    return str.replace(new RegExp(key, 'gi'), (match: string) => {
      return `<span style="color:red;">${match}</span>`
    })
  }

  // 清空搜索联想
  const onClear = () => {
    // 清空搜索关键字
    setKeyword('')
    // 设置搜索状态
    setIsSeaarching(false)
    // 清空redux内容
    dispatch(clearSuggestions())
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className="navbar"
        onLeftClick={() => history.go(-1)}
        extra={
          <span className="search-text">搜索</span>
        }
      >
        <div className="navbar-search">
          <Icon type="iconbtn_search" className="icon-search" />

          <div className="input-wrapper">
            {/* 输入框 */}
            <input type="text" placeholder="请输入关键字搜索" value={keyword} onChange={onChange} />

            {/* 清空输入框按钮 */}
            <Icon type="iconbtn_tag_close" className="icon-close" onClick={onClear} />
          </div>
        </div>
      </NavBar>

      {/* 搜索历史 */}
      <div className="history" style={{ display: isSearching? 'none':'block' }}>
        <div className="history-header">
          <span>搜索历史</span>
          <span>
            <Icon type="iconbtn_del" />清除全部
          </span>
        </div>

        <div className="history-list">
          <span className="history-item">
            Python生成九宫格图片<span className="divider"></span>
          </span>
          <span className="history-item">
            Python<span className="divider"></span>
          </span>
          <span className="history-item">
            CSS<span className="divider"></span>
          </span>
          <span className="history-item">
            数据分析<span className="divider"></span>
          </span>
        </div>
      </div>

      {/* 搜素建议结果列表 */}
      <div className={classnames('search-result', {show:isSearching})}>
        {suggestions.map((item, index) => {
          return  <div className="result-item" key={index}>
          <Icon className="icon-search" type="iconbtn_search" />
            <div className="result-value" dangerouslySetInnerHTML={{
            __html:hightLight(item,keyword)
          }}>
          </div>
        </div>
        })}
       </div>
    </div>
  )
}

export default Search