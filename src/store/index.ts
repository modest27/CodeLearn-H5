// 创建store
import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import { getLocalHistories, getTokenInfo } from '@/utils/storage'
import { ThunkAction } from 'redux-thunk'
import { HomeAction } from './reducers/home'
import { LoginAction } from './reducers/login'
import { ProfileAction } from './reducers/profile'
import { SearchAction } from './reducers/search'
import {ArticleAction} from './reducers/article'


// 参数1 reducer，参数2 store初始值， 参数3 指定中间件
const store = createStore(reducer, { login: getTokenInfo(),search:{suggestions:[],results:[],histories:getLocalHistories()} }, composeWithDevTools(applyMiddleware(thunk)))

// 获取useSelector的state的类型
export type RootState = ReturnType<typeof store.getState>

// ThunkAction<R,S,E,A>
type RootAction =  HomeAction | LoginAction | ProfileAction | SearchAction | ArticleAction
export type RooteThunkAction = ThunkAction<Promise<void>,RootState,unknown,RootAction>

export default store
