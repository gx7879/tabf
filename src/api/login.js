import request from '@/utils/service'

export function login(data) {
  return request({
    method: 'post',
    url: '/api/member/login',
    data
  })
}

export function signOut() {
  return request({
    method: 'get',
    url: '/api/member/logout'
  })
}
