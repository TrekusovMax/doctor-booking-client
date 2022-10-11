const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'jwt-local-id'

const setTokens = ({ refreshToken, accessToken, userId, expiresIn = 3600 }) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000

  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
  localStorage.setItem(USERID_KEY, userId)
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY)
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY)
}
export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY)
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
}

export default localStorageService