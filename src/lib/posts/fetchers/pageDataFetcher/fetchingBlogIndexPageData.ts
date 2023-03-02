import { postMatterResultOverviews, postPageData } from "@/types/matterResultData";
import { blogIndexPageCardData } from "@/types/cardData";
import { convertToDate } from "../../dataHandler/formatDateString";
import { PostMatterResultData } from "../../valueObjects/matterResultData/postMatterResultData"
import { MdFilePath } from "../../valueObjects/mdFilePath"
import { RecentPostCardContent } from "../../valueObjects/postContents/recentPostCardContent";
import { AllMdFilePathsFetcher } from "../filePathFetcher/allMdFilePathsFetcher";
import { UnexpectedBehaviorError } from "@/lib/error/unexpectedBehaviorError";


class BlogIndexPageDataFetcher {
  private readonly mainFeaturedPostId = "math/ai-formula"
  private readonly subFeaturedPostIdsList: ReadonlyArray<string> = ["stat/fundamental", "math/statistics-formula"]
  private currentTime: number
  private diffTime: number

  constructor() {
    this.currentTime = new Date().getTime()
    // 期限の日数(30日)
    const limitDays = 30
    // 期限日分のコンマ秒数
    this.diffTime = limitDays * 24 * 60 * 60 * 1000
  }

  private readonly isRecentPost = (postDate: Date): boolean => {
    return postDate.getTime() - this.currentTime <= this.diffTime
  }

  private readonly fetchRecentPostsCardData = async (postMatterResultData: PostMatterResultData): Promise<postPageData> => {
    const recentPostCardContent = new RecentPostCardContent(postMatterResultData.matterResultContent)
    const contentHtml = await recentPostCardContent.fetchHtmlCardContent()
    if (!contentHtml.isConvertedHtml) throw new UnexpectedBehaviorError('コンテンツがHTMLに変換されていません。')
    return {contentHtml: contentHtml.htmlContent, ...postMatterResultData.matterResultOverviews} as postPageData
  }
  
  readonly fetchBlogIndexPageCardData = async (): Promise<blogIndexPageCardData> => {
    let mainFeaturedPostCardData
    const subFeaturedPostsCardData: Array<postMatterResultOverviews> = []
    const recentPostsCardData: Array<postPageData> = []

    const fetcher = new AllMdFilePathsFetcher()
    fetcher.allPostMdFilePaths.map(async (mdFilePath: MdFilePath) => {
      const matterResult = new PostMatterResultData(mdFilePath)
      if (mdFilePath.postId === this.mainFeaturedPostId) mainFeaturedPostCardData = matterResult.matterResultOverviews
      if (this.subFeaturedPostIdsList.includes(mdFilePath.postId)) subFeaturedPostsCardData.push(matterResult.matterResultOverviews)
      const postDate = convertToDate(matterResult.matterResultOverviews.date)
      if (this.isRecentPost(postDate)) {
        const cardData = await this.fetchRecentPostsCardData(matterResult)
        return recentPostsCardData.push(cardData)
      }
    })

    if (mainFeaturedPostCardData === undefined) throw new UnexpectedBehaviorError('mainFeaturedPostが正常に取得できていません')
    if (subFeaturedPostsCardData.length < this.subFeaturedPostIdsList.length) throw new UnexpectedBehaviorError('subFeaturedPostが正常に取得できていません')
    return {mainFeaturedPostCardData, subFeaturedPostsCardData, recentPostsCardData} as blogIndexPageCardData
  }
}

export const fetchingBlogIndexPageCardData = async (): Promise<blogIndexPageCardData> => {
  const fetcher = new BlogIndexPageDataFetcher()
  return await fetcher.fetchBlogIndexPageCardData()
}
