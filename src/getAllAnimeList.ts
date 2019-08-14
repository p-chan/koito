import axios from 'axios'

type APICallParams = {
  initialCollectionKey: number
  consonantKey?: number
  mainKeyVisualSize?: number
  length?: number
  start?: number
}

type work = {
  workId: number
  workInfo: {
    workTitle: string
    link: string
    mainKeyVisualPath: string
    mainKeyVisualAlt: string
    workIcons: workIcons[]
    myListCount: number
    favoriteCount: number
    workTypeList: workTypeList[]
  }
}

type workIcons = 'hd' | 'new' | 'free' | 'limitedTime'
type workTypeList = 'anime' | 'radio'

const getDAnimeStoreAPI = async (obj: APICallParams) => {
  return axios.get('https://anime.dmkt-sp.jp/animestore/rest/WS000108', {
    params: {
      workTypeList: 'anime',
      initialCollectionKey: obj.initialCollectionKey, // 1: あ, 2: か, ... , 10: わ
      consonantKey: obj.consonantKey || 1, // あ -> 1: あ, 2: い, 3: う, 4: え, 5: お
      mainKeyVisualSize: obj.mainKeyVisualSize || 1, // 1: large, 2: medium, 3: small
      start: obj.start || 0,
      length: obj.length || 20
    }
  })
}

const getAllAnimeList = async () => {
  let allAnimeList: work[] = []

  const initialCollectionKeys = 10
  const consonantKeys = 5

  for (let i = 1; i <= initialCollectionKeys; i++) {
    for (let j = 1; j <= consonantKeys; j++) {
      // や行 (initialCollectionKeys: 8) の場合、や: 1, ゆ: 3, よ: 5
      if ((i === 8 && j === 2) || (i === 8 && j === 4)) continue

      // わ行 (initialCollectionKeys: 10) の場合、わ: 1, を: 2, ん: 3
      if (i === 10 && j >= 4) continue

      await getDAnimeStoreAPI({
        initialCollectionKey: i,
        consonantKey: j,
        length: 300
      })
        .then(async res => {
          await Promise.all(
            res.data.data.workList.map((work: work) => {
              allAnimeList.push(work)
            })
          )
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  return allAnimeList
}

export default getAllAnimeList
