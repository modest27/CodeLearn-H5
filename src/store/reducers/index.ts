import login from './login'
import profile from './profile'
import home from './home'
import search from './search'
import article from './article'
import { combineReducers } from 'redux'

// const { combineReducers } = require('redux')

const reducer = combineReducers({
  login,
  profile,
  home,
  search,
  article
})

export default reducer
