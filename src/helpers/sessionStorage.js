export const getStorage = (key, defaultValue = null) => {
  const value = sessionStorage.getItem(key)
  if (value) {
    try {
      return JSON.parse(value)
    } catch (e) {}
  }

  return defaultValue
}

export const setStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export const removeStorage = (key) => {
  sessionStorage.removeItem(key)
}
