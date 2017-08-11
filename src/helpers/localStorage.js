export const getStorage = (key, defaultValue = null) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    return defaultValue
  }
}

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeStorage = (key) => {
  localStorage.removeItem(key)
}
