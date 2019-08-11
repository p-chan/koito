import puppeteer from 'puppeteer'
import scrollToBottom from './scrollToBottom'
import getAllAnime from './getAllAnime'
import { sleep } from './utils'

const INITIAL_URL =
    'https://anime.dmkt-sp.jp/animestore/c_all_pc?initialCollectionKey=1'

  /**
   * メイン
   */
;(async () => {
  // ブラウザを立ち上げる
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1280,
      height: 768
    }
  })

  // 新しくページを開く
  const page = await browser.newPage()

  // dアニメストアの検索ページに遷移する
  await page.goto(INITIAL_URL, {
    waitUntil: 'domcontentloaded'
  })

  const tabItems = await page.$$('#characterSelect .headerTab ul li')

  for (let i = 0; i < tabItems.length; i++) {
    const tabItems = await page.$$('#characterSelect .headerTab ul li')
    const tabItem = tabItems[i]

    await tabItem.click()
    console.log('tabItem をクリック')
    await sleep(1000)

    const subTabItems = await page.$$('#characterSelect .headerSubTab ul li')

    for (let j = 0; j < subTabItems.length; j++) {
      const subTabItems = await page.$$('#characterSelect .headerSubTab ul li')
      const subTabItem = subTabItems[j]

      await subTabItem.click()
      console.log('subTabItem をクリック')
      await sleep(1000)

      await scrollToBottom(page)
      const allAnime = await getAllAnime(page)
    }
  }

  await browser.close()
})()
