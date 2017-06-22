const TOKEN_KEY = 'token'

export const getStorage = (local) => {
  return local ? localStorage : sessionStorage
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
}

export const setToken = (token, local) => {
  const isLocal = local || false
  const storage = getStorage(isLocal)

  storage.setItem(TOKEN_KEY, token)
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
}
