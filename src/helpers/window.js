const getWindow = () => {
  return window || { location: {} }
}

export const redirect = (url) => {
  const window = getWindow()
  window.location.href = url
}
