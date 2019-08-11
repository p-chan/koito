import puppeteer from 'puppeteer'

const getAllAnime = async (page: puppeteer.Page) => {
  const allAnime = await page.$$('#listContainer .itemModule')

  console.log(allAnime.length)

  let data = []

  for (let i = 0; i < allAnime.length; i++) {
    const anime = allAnime[i]

    const id = await anime.$eval('.textContainer', element => {
      const href = element.getAttribute('href')

      if (!href) return

      return href.split('?workId=')[1]
    })

    const title = await anime.$eval('.textContainer .ui-clamp', element => {
      return element.textContent
    })

    data.push({
      id: id,
      title: title
    })
  }

  console.log(data)

  return data
}

export default getAllAnime
