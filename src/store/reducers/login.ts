type Token = {
  token: string
  refresh_token:string
}

type ActionType = {
  type: 'login/token'|'login/logout'
  payload:Token
} 

const initValue:Token = {
  token: '',
  refresh_token: ''
}

export default function reducer(state = initValue, action:ActionType) {
  const { type, payload } = action
  if (type === 'login/token') {
    return payload
  }
  if (type === 'login/logout') {
    return {} as Token
  }
  return state
}
