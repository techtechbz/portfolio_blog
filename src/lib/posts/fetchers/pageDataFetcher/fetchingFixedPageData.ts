
import { FixedPageMatterResultData } from "../../valueObjects/matterResultData/fixedMatterResultData";
import { MdFilePath } from "../../valueObjects/mdFilePath"
import { FixedPageContent } from "../../valueObjects/postContents/fixedPageContent";


class FixedPageDataFetcher {
  private readonly fixedPageFilePath: MdFilePath

  constructor(postId: string) {
    this.fixedPageFilePath = new MdFilePath("id", postId)
  }

  getFixedPageContent = async () => {
    const matterResultData = new FixedPageMatterResultData(this.fixedPageFilePath)
    const fixedPageContent = new FixedPageContent(matterResultData.matterResultContent)
    const htmlFixedPageContent = await fixedPageContent.getHtmlFixedPageContent()
    if (!htmlFixedPageContent.isConvertedHtml) throw new Error('HTMLに変換されていません。')
    return {contentHtml: htmlFixedPageContent.content, ...matterResultData.matterResultOverviews}
  }
}

const fetchingFixedPageData = async (pageId: string) => {
  const fetcher = new FixedPageDataFetcher(pageId)
  return await fetcher.getFixedPageContent()
}

export default fetchingFixedPageData