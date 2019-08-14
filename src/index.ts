import puppeteer from 'puppeteer'

import { defaultViewport, isHeadless } from './utils'

import getAllAnimeList from './getAllAnimeList'
import getOneAnimeDetail from './getOneAnimeDetail'

/**
 * メイン
 */
;(async () => {
  const allAnimeList = await getAllAnimeList()

  const browser = await puppeteer.launch({
    headless: isHeadless,
    defaultViewport: defaultViewport
  })

  for (let i = 0; i < allAnimeList.length; i++) {
    const item = allAnimeList[i]
    const detail = await getOneAnimeDetail(browser, item.workId)
  }

  await browser.close()
})()
