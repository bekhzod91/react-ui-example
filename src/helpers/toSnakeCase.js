export const toSnake = (str) => {
  return str
    .replace(/\./g, '__')
    .replace(/([A-Z])/g, ($1) => '_' + $1.toLowerCase())
}
