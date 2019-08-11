import puppeteer from 'puppeteer'
import { sleep } from './utils'

const scrollToBottom = async (page: puppeteer.Page) => {
  const maxTryLimit = 30

  let prevPositionY = 0

  let equalCount = 0
  let endEqualCount = 10

  for (let i = 0; i < maxTryLimit; i++) {
    await page.evaluate(async () => {
      return await window.scrollBy(0, window.innerHeight)
    })

    const positionY = await page.evaluate(async () => {
      return Promise.resolve(document.body.scrollHeight)
    })

    console.log(`prevPositionY: ${prevPositionY}`)
    console.log(`positionY: ${positionY}`)

    if (prevPositionY === positionY) {
      equalCount += 1
    } else {
      equalCount = 0
    }
    console.log(equalCount)

    if (endEqualCount <= equalCount) return console.log('endEqualCount!')

    prevPositionY = positionY

    await sleep(100)
  }

  await sleep(300)
}

export default scrollToBottom
