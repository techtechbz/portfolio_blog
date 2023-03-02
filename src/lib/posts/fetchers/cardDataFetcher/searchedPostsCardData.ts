import { PostMatterResultData } from "../../valueObjects/matterResultData/postMatterResultData"
import { RecentPostCardContent } from "../../valueObjects/postContents/recentPostCardContent";
import { UnexpectedBehaviorError } from "@/lib/error/unexpectedBehaviorError";


export class SearchedPostsCardData {
  private readonly searchedPostMatterResultDataList: ReadonlyArray<PostMatterResultData>
  
  constructor(postMatterResultDataList: ReadonlyArray<PostMatterResultData>) {
    this.searchedPostMatterResultDataList = postMatterResultDataList
  }

  readonly fetchCardData = async () => {
    return Promise.all(this.searchedPostMatterResultDataList.map(async (postMatterResultData: PostMatterResultData) => {
      const recentPostCardContent = new RecentPostCardContent(postMatterResultData.matterResultContent)
      const htmlCardContent = await recentPostCardContent.fetchHtmlCardContent()
      if (!htmlCardContent.isConvertedHtml) throw new UnexpectedBehaviorError('コンテンツがHTMLに変換されていません。')
      return {contentHtml: htmlCardContent.htmlContent, ...postMatterResultData.matterResultOverviews}
    }))
  }
}