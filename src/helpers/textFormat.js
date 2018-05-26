export const capitalize = text => {
  return text.trim().replace(/^\w/, c => c.toUpperCase())
}
