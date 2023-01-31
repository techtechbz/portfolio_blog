import { PostMatterResultData } from "../matterResultData/matterResultData"
import { PostDataValidator } from "../PostDataValidator"
import { MdFilePath } from "../mdFilePath/valueObect"


class RelatedPostsCardDataFetcher {
  private readonly relatedPostIdsList: ReadonlyArray<string>
  private readonly postDataValidator: PostDataValidator = new PostDataValidator()

  constructor(postIdsList: ReadonlyArray<string>) {
    this.postDataValidator.postsIdsListValidator(postIdsList)
    this.relatedPostIdsList = postIdsList
  }
  
  get relatedPostsMatterResultData() {
    return this.relatedPostIdsList.map((postId: string) => {
      const mdFilePath = new MdFilePath("id", postId)
      return new PostMatterResultData(mdFilePath).matterResultOverviews
    })
  }
}

const fetchingRelatedPostsCardData = async (postIdsList: ReadonlyArray<string>) => {
  const featuredPostsCardDataFetcher = new RelatedPostsCardDataFetcher(postIdsList)
  return featuredPostsCardDataFetcher.relatedPostsMatterResultData
}

export default fetchingRelatedPostsCardData