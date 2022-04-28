import request from '@/utils/request'

export const sendCode = mobile => {
  return async () => {
    // 发送请求
    const res = await request({
      url: `/sms/codes/${mobile}`,
      method: 'GET'
    })
    console.log(res)
  }
}
