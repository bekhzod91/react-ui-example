export const getStorage = (key, defaultValue = null) => {
  const value = localStorage.getItem(key)
  if (value) {
    try {
      return JSON.parse(value)
    } catch (e) {}
  }

  return defaultValue
}

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeStorage = (key) => {
  localStorage.removeItem(key)
}
