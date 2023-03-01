import fetchingSearchedArchivePostsData from "@/lib/posts/fetchers/searchPosts/searchingPostArchives"
import fetchingSearchedCategoryPostsData from "@/lib/posts/fetchers/searchPosts/searchingCategoryPost"


const searchResultKeys = ['foundPostsData', 'resultMessage']

describe('Search posts data fetchers test', () => {
  it.each([
    {month: "2023-02", length: 4, resultMessage: '4件見つかりました。'},
    {month: "2023-01", length: 0, resultMessage: 'お探しのアーカイブに関する記事は見つかりませんでした。'},
  ])('Search archive fetcher test ($month)', async ({month, length, resultMessage}) => {
    const searchResult = await fetchingSearchedArchivePostsData(month)
    expect(Object.keys(searchResult)).toStrictEqual(searchResultKeys)
    expect(searchResult.foundPostsData.length).toBe(length)
    expect(searchResult.resultMessage).toBe(resultMessage)
  })

  it.each([
    {category: "math", length: 2, resultMessage: '2件見つかりました。'},
  ])('Search category fetcher data ($category)', async ({category, length, resultMessage}) => {
    const searchResult = await fetchingSearchedCategoryPostsData(category)
    expect(Object.keys(searchResult)).toStrictEqual(searchResultKeys)
    expect(searchResult.foundPostsData.length).toBe(length)
    expect(searchResult.resultMessage).toBe(resultMessage)
  })
})