import { convertToDate } from "../../dataHandler/formatDateString";
import { PostMatterResultData } from "../../valueObjects/matterResultData/postMatterResultData";
import { MdFilePath } from "../../valueObjects/mdFilePath";
import { SearchedPostsCardData } from "../cardDataFetcher/searchedPostsCardData";
import { AllMdFilePathsFetcher } from "../filePathFetcher/allMdFilePathsFetcher";


class SearchedArchivePostsFetcher {
  private searchYear: number
  private searchMonth: number
  private allPostMdFilePaths: ReadonlyArray<MdFilePath>

  constructor(archive: string) {
    const [ searchYear, searchMonth ] = archive.split("-").map((dateString: string) => Number(dateString))
    this.searchYear = searchYear
    this.searchMonth = searchMonth
    this.allPostMdFilePaths = new AllMdFilePathsFetcher().allPostMdFilePaths
  }

  private readonly isSearchedArchivesPosts = (postDate: Date): boolean => {
    return this.searchYear === postDate.getFullYear() && this.searchMonth - 1 === postDate.getMonth()
  }

  private get searchedArchivePostMatterResult(): ReadonlyArray<PostMatterResultData> {
    return this.allPostMdFilePaths.flatMap((mdFilePath: MdFilePath) => {
      const matterResult = new PostMatterResultData(mdFilePath)
      const postDate = convertToDate(matterResult.matterResultOverviews.date)
      if (this.isSearchedArchivesPosts(postDate)) return matterResult
      return []
    })
  }

  readonly getSearchedArchivesPostData = async () => {
    const foundPathsNumber = this.searchedArchivePostMatterResult.length
    if (foundPathsNumber === 0) return {foundPostsData: [], resultMessage: "お探しのアーカイブに関する記事は見つかりませんでした。"};
    const searchedPostsCardData = new SearchedPostsCardData(this.searchedArchivePostMatterResult)
    return {foundPostsData: await searchedPostsCardData.fetchCardData(), resultMessage: `${foundPathsNumber}件見つかりました。`}
  }
}

const fetchingSearchedArchivePostsData = async (monthString: string) => {
  const fetcher = new SearchedArchivePostsFetcher(monthString)
  return await fetcher.getSearchedArchivesPostData()
}

export default fetchingSearchedArchivePostsData