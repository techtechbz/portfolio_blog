import { postPageData } from "@/types/matterResultData";
import { blogIndexPageCardData, featuredPostsCardData, recentPostsCardData } from "@/types/cardData";
import { PostMatterResultData } from "../../valueObjects/matterResultData/postMatterResultData"
import { MdFilePath } from "../../valueObjects/mdFilePath"
import { MdFilePathsFetcher } from "../mdFilePathsFetcher";
import { RecentPostCardContent } from "../../valueObjects/postContents/recentPostCardContent";
import { UnexpectedBehaviorError } from "@/lib/error/unexpectedBehaviorError";


class IndexPageDataFetcher {
  private readonly homeFeaturedPostIdsList: ReadonlyArray<string> = ["math/valid-second", "math/valid-third"]
  private readonly mainFeaturedPostId: ReadonlyArray<string> = ["math/valid"]
  private readonly subFeaturedPostIdsList: ReadonlyArray<string> = ["math/valid-second", "math/valid-third"]

  private readonly fetchRecentPostMdFilePaths = async (): Promise<ReadonlyArray<MdFilePath>> => {
    const fetcher = new MdFilePathsFetcher()
    return await fetcher.recentPostPaths()
  }

  private readonly removeDuplicateMdFilePaths = (mdFilePathsList: ReadonlyArray<MdFilePath>): ReadonlyArray<MdFilePath> => {
    const postIdsList = mdFilePathsList.map(mdFilePath => mdFilePath.postId)
    return mdFilePathsList.filter((mdFilePath, i) => {
      if (postIdsList.indexOf(mdFilePath.postId) === i) return mdFilePath
    })
  }

  private readonly fetchMatterResultDataList = (mdFilePathsList: ReadonlyArray<MdFilePath>): ReadonlyArray<PostMatterResultData> => {
    const omittedList = this.removeDuplicateMdFilePaths(mdFilePathsList)
    return omittedList.map((mdFilePath: MdFilePath) => new PostMatterResultData(mdFilePath))
  }

  private readonly fetchRecentPostsCardData = async (postMatterResultDataList: ReadonlyArray<PostMatterResultData>): Promise<recentPostsCardData> => {
    const fetchedData = Promise.all(postMatterResultDataList.map(async (data) => {
      const recentPostCardContent = new RecentPostCardContent(data.matterResultContent)
      const contentHtml = await recentPostCardContent.fetchHtmlCardContent()
      if (!contentHtml.isConvertedHtml) throw new UnexpectedBehaviorError('コンテンツがHTMLに変換されていません。')
      return {contentHtml: contentHtml.htmlContent, ...data.matterResultOverviews} as postPageData
    }))
    return fetchedData
  }

  private readonly selectFeaturedPostsCardData = (featuredPostIdsList: ReadonlyArray<string>, postMatterResultDataList: ReadonlyArray<PostMatterResultData>): featuredPostsCardData => {
    return featuredPostIdsList.map((postId: string) => {
      const foundData = postMatterResultDataList.find((data: PostMatterResultData) => data.matterResultOverviews.id === postId)
      if (foundData === undefined) throw new UnexpectedBehaviorError(`(${postId}) データが見つかりませんでした。`)
      return foundData.matterResultOverviews
    })
  }
  
  readonly fetchHomePageCardData = async (): Promise<featuredPostsCardData> => {
    const homeFeaturedPostMdFilePaths = this.homeFeaturedPostIdsList.map((postId: string) => new MdFilePath("id", postId))
    const matterResultDataList = this.fetchMatterResultDataList(homeFeaturedPostMdFilePaths)
    
    return this.selectFeaturedPostsCardData(this.homeFeaturedPostIdsList, matterResultDataList)
  }

  readonly fetchBlogIndexPageCardData = async (): Promise<blogIndexPageCardData> => {
    const recentPostMdFilePaths = await this.fetchRecentPostMdFilePaths()
    const featuredPostIdsList = this.mainFeaturedPostId.concat(this.subFeaturedPostIdsList)
    const featuredPostMdFilePaths = featuredPostIdsList.map((postId: string) => new MdFilePath("id", postId))
    const allMdFilePaths = recentPostMdFilePaths.concat(featuredPostMdFilePaths)

    const matterResultDataList = this.fetchMatterResultDataList(allMdFilePaths)
    
    const recentPostsCardData = await this.fetchRecentPostsCardData(matterResultDataList.slice(0, recentPostMdFilePaths.length - 1))
    const mainFeaturedPostCardData = this.selectFeaturedPostsCardData(this.mainFeaturedPostId, matterResultDataList)
    const subFeaturedPostsCardData = this.selectFeaturedPostsCardData(this.subFeaturedPostIdsList, matterResultDataList)
    return {mainFeaturedPostCardData: mainFeaturedPostCardData[0], subFeaturedPostsCardData, recentPostsCardData}
  }
}

export const fetchingHomePageCardData = async (): Promise<featuredPostsCardData> => {
  const fetcher = new IndexPageDataFetcher()
  return await fetcher.fetchHomePageCardData()
}

export const fetchingBlogIndexPageCardData = async (): Promise<blogIndexPageCardData> => {
  const fetcher = new IndexPageDataFetcher()
  return await fetcher.fetchBlogIndexPageCardData()
}