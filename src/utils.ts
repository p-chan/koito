/**
 * async-await 対応の setTimeout
 * @param ms
 */
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(() => resolve(), ms))
}
