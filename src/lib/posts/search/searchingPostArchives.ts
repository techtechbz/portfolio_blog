import { SearchedPostsCardData } from "../cardData/searchedPostsCardData";
import { MdFilePathsFetcher } from "../mdFilePath/fetcher"


class SearchedArchivePostsFetcher {
  private readonly mdFilePathFetcher: MdFilePathsFetcher = new MdFilePathsFetcher()
  private searchedArchive: string

  constructor(archive: string) {
    this.searchedArchive = archive
  }

  readonly getSearchedArchivesPostData = async () => {
    const searchedPostPaths = await this.mdFilePathFetcher.searchedArchivePostPaths(this.searchedArchive)
    const foundPathsNumber = searchedPostPaths.length
    if (foundPathsNumber === 0) return {foundPostsData: [], resultMessage: "お探しのアーカイブに関する記事は見つかりませんでした。"};
    const searchedPostsCardData = new SearchedPostsCardData(searchedPostPaths)
    return {foundPostsData: await searchedPostsCardData.fetchCardData(), resultMessage: `${foundPathsNumber}件見つかりました。`}
  }
}

const fetchingSearchedArchivePostsData = async (monthString: string) => {
  const fetcher = new SearchedArchivePostsFetcher(monthString)
  return await fetcher.getSearchedArchivesPostData()
}

export default fetchingSearchedArchivePostsData