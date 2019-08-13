/**
 * async-await 対応の setTimeout
 * @param ms
 */
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(() => resolve(), ms))
}

export const defaultViewport = {
  width: 1280,
  height: 768
}

export const isHeadless = process.env.NODE_ENV === 'production' ? true : false
