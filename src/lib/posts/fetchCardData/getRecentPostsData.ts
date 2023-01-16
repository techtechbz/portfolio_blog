import { htmlPostData } from "@/common/types/postData"
import { getSortedPostData } from "../dataConverter/getSortedPostData"
import { getHtmlPageData } from "../translateToHtml/getHtmlPageData"


export const getRecentPostsData = async (recentMdFilePaths: ReadonlyArray<string>): Promise<ReadonlyArray<htmlPostData>> => {
  const recentPostsData = await Promise.all(recentMdFilePaths.map(async filePath => {
    return await getHtmlPageData(filePath, true)
  }))

  return getSortedPostData(recentPostsData)
}
