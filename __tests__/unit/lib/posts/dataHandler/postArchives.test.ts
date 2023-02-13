import { SITE_PUBLISH_YEAR } from "@/common/constants/siteOverviews"
import { PostArchives } from "@/lib/posts/dataHandler/postArchives"


const postArchives = new PostArchives()

const currentArchivesList: Array<string> = []
const today = new Date()
const thisYear = today.getFullYear()
const thisMonth = today.getMonth() + 1

for (let year = SITE_PUBLISH_YEAR; year <= thisYear; year++) {
  if (year === thisYear) {
    for (let month = 1; month <= thisMonth; month++) {
      currentArchivesList.push(`${year}-${String(month).padStart(2, '0')}`)
    }
  } else {
    for (const month of [...Array(12).keys()]) {
      currentArchivesList.push(`${year}-${String(month + 1).padStart(2, '0')}`)
    }
  }
}

describe('post archives test', () => {
  it('Archives list test', () => {
    expect(postArchives.archivesList).toStrictEqual(currentArchivesList)
  })
  
  it('Archives params test', () => {
    postArchives.archivesParams.map((element) => {
      expect(Object.keys(element.params)).toStrictEqual(["month"])
      expect(currentArchivesList.includes(element.params.month)).toBe(true)
    })
  })
  
  it('Archives menu links list test', () => {
    expect(Object.keys(postArchives.archivesMenuLinksList)).toStrictEqual(currentArchivesList)
    Object.entries(postArchives.archivesMenuLinksList).map(([key, value]) => {
      expect(Object.keys(value)).toStrictEqual(["text", "href"])
    })
  })
  
})