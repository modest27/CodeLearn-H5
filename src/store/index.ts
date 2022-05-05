// 创建store
import { createStore, applyMiddleware,AnyAction } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import { getTokenInfo } from '@/utils/storage'
import { ThunkAction } from 'redux-thunk'


// 参数1 reducer，参数2 store初始值， 参数3 指定中间件
const store = createStore(reducer, { login: getTokenInfo() }, composeWithDevTools(applyMiddleware(thunk)))

// 获取useSelector的state的类型
export type RootState = ReturnType<typeof store.getState>

// ThunkAction<R,S,E,A>
export type RooteThunkAction = ThunkAction<Promise<void>,RootState,unknown,AnyAction>

export default store
