import { PostMatterResultData } from "../../valueObjects/matterResultData/postMatterResultData"
import { MdFilePath } from "../../valueObjects/mdFilePath"
import { RecentPostCardContent } from "../../valueObjects/postContents/recentPostCardContent";


export class SearchedPostsCardData {
  private readonly searchedMdFilePathsList: ReadonlyArray<MdFilePath>
  
  constructor(mdFilePathsList: ReadonlyArray<MdFilePath>) {
    this.searchedMdFilePathsList = mdFilePathsList
  }

  readonly fetchCardData = async () => {
    return Promise.all(this.searchedMdFilePathsList.map(async (mdFilePath: MdFilePath) => {
      const matterResultData = new PostMatterResultData(mdFilePath)
      const recentPostCardContent = new RecentPostCardContent(matterResultData.matterResultContent)
      const htmlCardContent = await recentPostCardContent.fetchHtmlCardContent()
      if (!htmlCardContent.isConvertedHtml) throw new Error('コンテンツがHTMLに変換されていません。')
      return {contentHtml: htmlCardContent.content, ...matterResultData.matterResultOverviews}
    }))
  }
}