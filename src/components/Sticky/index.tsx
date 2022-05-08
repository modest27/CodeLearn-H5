import { useEffect, useRef } from 'react'
import styles from './index.module.scss'

/**
 * 吸顶组件
 * @param {HTMLElement} props.root 滚动容器元素 
 * @param {Number} props.height 吸顶元素的高度
 * @param {HTMLElement} props.offset 吸顶位置的 top 值
 * @param {HTMLElement} props.children 本组件的子元素  
 */
type Props = {
  children: React.ReactElement | string
  top?:number
}
const Sticky = ({ children,top=0 }: Props) => {
  const placeRef = useRef<HTMLDivElement>(null)
  const childrenRef = useRef<HTMLDivElement>(null)
 
 
  useEffect(() => {
     // top的换算
  // top/375 = x/当前屏幕宽度
  let value = (top/375)*document.documentElement.clientWidth
    const place = placeRef.current!
    const children = childrenRef.current!
    const onScroll = () => {
      if (place.getBoundingClientRect().top <= value) {
        // 吸顶
        children.style.position = 'fixed'
        children.style.top = value + 'px'
        place.style.height = children.offsetHeight + 'px'
      } else {
        children.style.position = 'static'
        children.style.top = 'auto'
        place.style.height = '0px'
        
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll',onScroll)
    }
  },[top])
  
  return (
    <div className={styles.root}>
      {/* 占位元素 */}
      <div  className="sticky-placeholder" ref={placeRef} />

      {/* 吸顶显示的元素 */}
      <div className="sticky-container" ref={childrenRef} >
        {children}
      </div>
    </div>
  )
}

export default Sticky