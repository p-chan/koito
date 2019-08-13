import puppeteer from 'puppeteer'

import { defaultViewport, isHeadless, sleep } from './utils'

const getAnimeURLById = async (id: number) => {
  return `https://anime.dmkt-sp.jp/animestore/ci_pc?workId=${id}`
}

const getOneAnime = async (id: number) => {
  const browser = await puppeteer.launch({
    headless: isHeadless,
    defaultViewport: defaultViewport
  })

  const page = await browser.newPage()

  await page.goto(await getAnimeURLById(id), {
    waitUntil: 'domcontentloaded'
  })

  // lazyload 対策
  await sleep(1000)

  // タイトルを取得する
  const titleSelector = '.information .titleWrap h1'
  const title = await page.$eval(titleSelector, element => {
    return element.textContent!.split('（全')[0]
  })

  // エピソード数を取得する
  const episodeNumSelector = '.information .titleWrap h1 span'
  const episodeNum = await page.$eval(episodeNumSelector, element => {
    return Number(element.textContent!.replace('（全', '').replace('話）', ''))
  })

  // キービジュアルの URL を取得する
  const keyVisualSelector = '.keyVisual .imgWrap16x9:nth-child(1) img'
  const keyVisualURL = await page.$eval(keyVisualSelector, element => {
    return element.getAttribute('src')!.split('?')[0]
  })

  // 気になる登録数を取得する
  const favoriteSelector = '.optionIconContainer .nonmemberFavoriteCount span'
  const favoriteNum = await page.$eval(favoriteSelector, element => {
    return Number(element.textContent)
  })

  // オプションを取得する
  const optionSelector = '.optionIconContainer .optionText'
  const optionText =
    (await page.$(optionSelector)) &&
    (await page.$eval(optionSelector, element => {
      return element.textContent
    }))

  const isHD = optionText === 'HD対応' ? true : false

  // 製作年と放送シーズンを取得する
  const tagSelector = '.tagArea .tagWrapper li'
  const tagList = await page.$$eval(tagSelector, elements => {
    return elements.map(element =>
      element.textContent!.replace('\n', '').replace('\n', '')
    )
  })

  let createdYear = null
  let seasonName = null
  let seasonNameText = null

  await Promise.all(
    tagList.map(async tag => {
      if (tag.match(/^製作年：/)) {
        createdYear = Number(tag.replace('製作年：', '').replace('年', ''))
      }

      if (
        tag.match(/年春$/) ||
        tag.match(/年夏$/) ||
        tag.match(/年秋$/) ||
        tag.match(/年冬$/)
      ) {
        seasonName = tag
          .replace('年', '-')
          .replace('春', 'spring')
          .replace('夏', 'summer')
          .replace('秋', 'autumn')
          .replace('冬', 'winter')
        seasonNameText = tag
      }
    })
  )

  await browser.close()

  return {
    id: id,
    title: title,
    episode_num: episodeNum,
    kv_url: keyVisualURL,
    favorite_num: favoriteNum,
    is_hd: isHD,
    created_year: createdYear,
    season_name: seasonName,
    season_name_text: seasonNameText
  }
}

export default getOneAnime
