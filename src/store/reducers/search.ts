type SearchType = {
  suggestions:string[]
}

export type SearchAction = {
  type: 'search/saveSuggestions',
  payload:string[]
} | {
  type:'search/clearSuggestions'
}

const initValue:SearchType = {
  // 存放推荐的结果
  suggestions:[]
}

export default function reducer(state = initValue, action: SearchAction) {
  if (action.type === 'search/saveSuggestions') {
    return {
      ...state,
      suggestions:action.payload
    }
  }
  if (action.type === 'search/clearSuggestions') {
    return {
      ...state,
      suggestions:[]
    }
  }
    
  return state
}