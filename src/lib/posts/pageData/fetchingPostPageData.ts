import { PostMatterResultData } from "../matterResultData/matterResultData";
import { MdFilePath } from "../mdFilePath/valueObect";
import { PostPageContent } from "../postContent/postPageContent";


class PostPageDataFetcher {
  private readonly postFilePath: MdFilePath

  constructor(postId: string) {
    this.postFilePath = new MdFilePath("id", postId)
  }

  readonly getPostPageContent = async () => {
    const matterResultData = new PostMatterResultData(this.postFilePath)
    const postPageContent = new PostPageContent(matterResultData.matterResultContent)
    const htmlPostPageContent = await postPageContent.htmlPostPageContent()
    if (!htmlPostPageContent.isConvertedHtml) throw new Error('HTMLに変換されていません。')
    return {contentHtml: htmlPostPageContent.content, ...matterResultData.matterResultOverviews}
  }
}

const fetchingPostPageData = async (postId: string) => {
  const fetcher = new PostPageDataFetcher(postId)
  return await fetcher.getPostPageContent()
}

export default fetchingPostPageData