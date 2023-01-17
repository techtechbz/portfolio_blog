import { htmlPostData } from "@/types/postData"
import { getMatterResultData } from "../globFileData/getMatterResultData"
import { convertToCardHtmlContents } from "./convertToCardHtmlContents"
import { convertToPostPageContents } from "./convertToPostPageContents"
import { fullPathToPostId } from "../dataConverter/fullPathToPostId"


export const getHtmlPageData = async (filePath: string, forCardContents: boolean=false): Promise<htmlPostData> => {
  const matterResult = await getMatterResultData(filePath)
  if (matterResult === undefined) throw new Error("コンテンツを取得できていません。")
  const contentHtml = forCardContents ? await convertToCardHtmlContents(matterResult.content) : await convertToPostPageContents(matterResult.content)
  
  return {
    id: fullPathToPostId(filePath),
    contentHtml,
    ...(matterResult.data)
  } as htmlPostData
}
