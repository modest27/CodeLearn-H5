import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const [time, setTime] = useState(3)
  const history = useHistory()
  const timeRef = useRef(-1)
  useEffect(() => {
    // 在ts中，使用定时器的时候，ts会默认将定时器认为是node中的定时器，而不是浏览器中的，以后注意timer不能定义为number
    // 以后使用定时器，我们推荐使用 window.setInterval 来明确指明
    let timer = setInterval(() => {
      setTime(time => {
        timeRef.current = time - 1
        return time - 1
      })
      if (timeRef.current === 0) {
        clearInterval(timer)
        history.push('/home')
      }
    }, 1000)
  }, [history])
  return (
    <div>
      <h1>对不起，你访问的内容不存在...</h1>
      <p>
        {time} 秒后，返回<Link to="/home">首页</Link>
      </p>
    </div>
  )
}
