import { featuredPostsCardData } from "@/types/cardData";
import { postMatterResultOverviews } from "@/types/matterResultData";
import { PostMatterResultData } from "../../valueObjects/matterResultData/postMatterResultData"
import { MdFilePath } from "../../valueObjects/mdFilePath"


class HomePageDataFetcher {
  private readonly homeFeaturedPostIdsList: ReadonlyArray<string> = ["economics/behavioral-economics", "coding/starting-python"]

  private readonly fetchMatterResultOverviewsList = (mdFilePathsList: ReadonlyArray<MdFilePath>): ReadonlyArray<postMatterResultOverviews> => {
    return mdFilePathsList.map((mdFilePath: MdFilePath) => {
      const matterResult = new PostMatterResultData(mdFilePath)
      return matterResult.matterResultOverviews
    })
  }
  
  get fetchHomePageCardData(): featuredPostsCardData {
    const homeFeaturedPostMdFilePaths = this.homeFeaturedPostIdsList.map((postId: string) => new MdFilePath("id", postId))
    return this.fetchMatterResultOverviewsList(homeFeaturedPostMdFilePaths)
  }
}

export const fetchingHomePageCardData = (): featuredPostsCardData => {
  const fetcher = new HomePageDataFetcher()
  return fetcher.fetchHomePageCardData
}