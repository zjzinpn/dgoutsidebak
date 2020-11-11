import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {

  return Cookies.get(TokenKey)
}

// 设置浏览器token
export function setToken(token) {
  return Cookies.set(TokenKey, token,{ expires: 365, path: '/' })
}

 export function removeToken() {
  return Cookies.remove(TokenKey,{ path: '/' })
}
