type SearchType = {
  suggestions:string[]
  histories:string[]
}

export type SearchAction = {
  type: 'search/saveSuggestions',
  payload:string[]
} | {
  type:'search/clearSuggestions'
} | {
  type: 'search/saveHistories',
  payload:string[]
} | {
  type:'search/clearHistories'
}

const initValue:SearchType = {
  // 存放推荐的结果
  suggestions: [],
  // 存放历史记录
  histories: []
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
  if (action.type === 'search/saveHistories') {
    return {
      ...state,
      histories:action.payload
    }
  }
  if (action.type === 'search/clearHistories') {
    return {
      ...state,
      histories:[]
    }
  }
    
  return state
}