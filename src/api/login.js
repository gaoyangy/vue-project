import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/passport/doLogin.html',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/passport/logout.html',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
