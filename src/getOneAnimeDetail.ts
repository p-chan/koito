import puppeteer from 'puppeteer'

import { sleep } from './utils'

const getAnimeURLById = async (id: number) => {
  return `https://anime.dmkt-sp.jp/animestore/ci_pc?workId=${id}`
}

const getOneAnimeDetail = async (browser: puppeteer.Browser, id: number) => {
  const page = await browser.newPage()

  await page.goto(await getAnimeURLById(id), {
    waitUntil: 'domcontentloaded'
  })

  // 1000ms スリープする
  await sleep(1000)

  // エピソード数を取得する
  let episodesCount: number | null = null

  const episodesCountSelector = '.information .titleWrap h1 span'
  const isEpisodesCount = await page.$(episodesCountSelector)

  if (isEpisodesCount) {
    episodesCount = await page.$eval(episodesCountSelector, element => {
      return Number(
        element.textContent!.replace('（全', '').replace('話）', '')
      )
    })
  }

  // 製作年と放送シーズンを取得する
  let createdYear: number | null = null
  let seasonName: string | null = null

  const tagListSelector = '.tagArea .tagWrapper li'
  const isTagList = await page.$(tagListSelector)

  if (isTagList) {
    const tagList = await page.$$eval(tagListSelector, elements => {
      return elements.map(element =>
        element.textContent!.replace('\n', '').replace('\n', '')
      )
    })

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
        }
      })
    )
  }

  await page.close()

  return {
    id: id,
    episodesCount: episodesCount,
    createdYear: createdYear,
    seasonName: seasonName
  }
}

export default getOneAnimeDetail
