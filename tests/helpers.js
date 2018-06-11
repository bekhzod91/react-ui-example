export const wait = () =>
  new Promise(resolve => setImmediate(() => resolve()))
