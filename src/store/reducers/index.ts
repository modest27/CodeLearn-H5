import login from './login'
import profile from './profile'
import home from './home'
import search from './search'
import { combineReducers } from 'redux'

// const { combineReducers } = require('redux')

const reducer = combineReducers({
  login,
  profile,
  home,
  search
})

export default reducer
