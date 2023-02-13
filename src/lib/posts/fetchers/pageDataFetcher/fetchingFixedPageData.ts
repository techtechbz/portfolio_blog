
import { UnexpectedBehaviorError } from "@/lib/error/unexpectedBehaviorError";
import { FixedPageMatterResultData } from "../../valueObjects/matterResultData/fixedMatterResultData";
import { MdFilePath } from "../../valueObjects/mdFilePath"
import { FixedPageContent } from "../../valueObjects/postContents/fixedPageContent";


class FixedPageDataFetcher {
  private readonly fixedPageFilePath: MdFilePath

  constructor(pageId: string) {
    this.fixedPageFilePath = new MdFilePath("id", pageId)
  }

  getFixedPageContent = async () => {
    const matterResultData = new FixedPageMatterResultData(this.fixedPageFilePath)
    const fixedPageContent = new FixedPageContent(matterResultData.matterResultContent)
    const htmlFixedPageContent = await fixedPageContent.getHtmlFixedPageContent()
    if (!htmlFixedPageContent.isConvertedHtml) throw new UnexpectedBehaviorError('HTMLに変換されていません。')
    return {contentHtml: htmlFixedPageContent.htmlContent, ...matterResultData.matterResultOverviews}
  }
}

const fetchingFixedPageData = async (pageId: string) => {
  const fetcher = new FixedPageDataFetcher(pageId)
  return await fetcher.getFixedPageContent()
}

export default fetchingFixedPageData