import { PostMatterResultData } from "../../valueObjects/matterResultData/postMatterResultData"
import { MdFilePath } from "../../valueObjects/mdFilePath"
import { PostPageContent } from "../../valueObjects/postContents/postPageContent";
import { UnexpectedBehaviorError } from "@/lib/error/unexpectedBehaviorError";


class PostPageDataFetcher {
  private readonly postFilePath: MdFilePath

  constructor(postId: string) {
    this.postFilePath = new MdFilePath("id", postId)
  }

  readonly getPostPageContent = async () => {
    const matterResultData = new PostMatterResultData(this.postFilePath)
    const postPageContent = new PostPageContent(matterResultData.matterResultContent)
    const htmlPostPageContent = await postPageContent.htmlPostPageContent()
    if (!htmlPostPageContent.isConvertedHtml) throw new UnexpectedBehaviorError('HTMLに変換されていません。')
    return {contentHtml: htmlPostPageContent.htmlContent, ...matterResultData.matterResultOverviews}
  }
}

const fetchingPostPageData = async (postId: string) => {
  const fetcher = new PostPageDataFetcher(postId)
  return await fetcher.getPostPageContent()
}

export default fetchingPostPageData