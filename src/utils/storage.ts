// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'codelearn-h5'
const CHANNEL_KEY = 'codelearn-h5-channels'
const SEARCH_KEY = 'codelearn-h5-search'

/**
 * 从本地缓存中获取 Token 信息
 */
export const getTokenInfo = ():Token => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY) as string ) || {}
}

/**
 * 将 Token 信息存入缓存
 * @param {Object} tokenInfo 从后端获取到的 Token 信息
 */
 type Token = {
  token: string
  refresh_token:string
}
export const setTokenInfo = (tokenInfo:Token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

/**
 * 删除本地缓存中的 Token 信息
 */
export const removeTokenInfo = () => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断本地缓存中是否存在 Token 信息
 */
export const hasToken = () => {
  return !!getTokenInfo().token
}

// 保存频道数据到本地
type Channels = {
  id: number
  name:string
}[]
export const setLocalChannels = (channels:Channels) => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}

// 获取本地频道数据
export const getLocalChannels = ():Channels => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY)!)
}

// 删除本地频道数据
export const removeLocalChannels = () => {
  localStorage.removeItem(CHANNEL_KEY)
}

/**
 * 从缓存获取搜索历史关键字
 */
 export const getLocalHistories = ():string[] => {
  return JSON.parse(localStorage.getItem(SEARCH_KEY)!) || []
}

/**
 * 将搜索历史关键字存入本地缓存
 * @param {Array} histories 
 */
export const setLocalHistories = (histories:string[]) => {
  localStorage.setItem(SEARCH_KEY, JSON.stringify(histories))
}

/**
 * 删除本地缓存中的搜索历史关键字
 */
export const removeLocalHistories = () => {
  localStorage.removeItem(SEARCH_KEY)
}
