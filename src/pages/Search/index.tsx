import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import classnames from 'classnames'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import { getSuggestList,clearSuggestions,addSearchList,clearHistories } from '@/store/actions/search'
import { RootState } from '@/store'
import {Dialog} from 'antd-mobile'


const Search = () => {
  const history = useHistory()
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()
  const {suggestions,histories} = useSelector((state: RootState) => state.search)
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

  // 搜索
  const onSearch = (key:string) => {
    if(!key) return
    dispatch(addSearchList(key))
    // 跳转到搜索页面
    history.push('/search/result?key='+key)
  }

  // 清空全部历史记录
  const onClearHistory = () => {
    Dialog.confirm({
      content: '您确定要清空记录吗？',
      onConfirm: function () {
        dispatch(clearHistories())
        
      }
    })
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className="navbar"
        onLeftClick={() => history.go(-1)}
        extra={
          <span className="search-text" onClick={()=>onSearch(keyword)}>搜索</span>
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
          <span onClick={onClearHistory}>
            <Icon type="iconbtn_del" />清除全部
          </span>
        </div>

        <div className="history-list">
          {histories.map((item, index) => {
            return  <span className="history-item" key={index} onClick={()=>onSearch(item)}>
              { item}<span className="divider"></span>
          </span>
          })}
         
        
        </div>
      </div>

      {/* 搜素建议结果列表 */}
      <div className={classnames('search-result', {show:isSearching})}>
        {suggestions.map((item, index) => {
          return  <div className="result-item" key={index} onClick={()=>onSearch(item)}>
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