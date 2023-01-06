import { SITE_DECSRIPTION } from "src/common/constants/siteOverviews"
import { complementedMatterResult, matterResultData } from "src/common/types/postData"

/**
 * 不足分のmatterデータを補完する
 * @param data 取得したmatterデータ
 * @returns 補完後のmatterデータ
 */
export const complementMatterResult = (data: matterResultData): complementedMatterResult => {
  const defaultPostData: complementedMatterResult = {
    title: "無題",
    description: SITE_DECSRIPTION,
    date: "2022-10-01",
    eyecatchFile: "blackboard.jpg",
    relatedPostsIds: []
  }
  return {...defaultPostData, ...data}
}