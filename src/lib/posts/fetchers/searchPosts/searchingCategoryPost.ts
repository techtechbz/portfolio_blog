import { SearchedPostsCardData } from "../cardDataFetcher/searchedPostsCardData";
import { MdFilePathsFetcher } from "../mdFilePathsFetcher";


class SearchedCategoryPostsFetcher {
  private readonly mdFilePathFetcher: MdFilePathsFetcher = new MdFilePathsFetcher()
  private searchedCategory: string

  constructor(category: string) {
    this.searchedCategory = category
  }

  readonly getSearchedCagetoryPostData = async () => {
    const searchedPostPaths = await this.mdFilePathFetcher.searchedCategoryPostPaths(this.searchedCategory)
    const foundPathsNumber = searchedPostPaths.length
    if (foundPathsNumber === 0) return {foundPostsData: [], resultMessage: "お探しのカテゴリーに関する記事は見つかりませんでした。"};
    const searchedPostsCardData = new SearchedPostsCardData(searchedPostPaths)
    return {foundPostsData: await searchedPostsCardData.fetchCardData(), resultMessage: `${foundPathsNumber}件見つかりました。`}
  }
}

const fetchingSearchedCategoryPostsData = async (category: string) => {
  const fetcher = new SearchedCategoryPostsFetcher(category)
  return await fetcher.getSearchedCagetoryPostData()
}

export default fetchingSearchedCategoryPostsData