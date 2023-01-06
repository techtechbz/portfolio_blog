import { htmlPostData } from "src/common/types/postData"

export const getSortedPostData = (postDataList: Array<htmlPostData>): ReadonlyArray<htmlPostData> => {
  return postDataList.sort((a: htmlPostData, b: htmlPostData) => {
    if (a.date < b.date) return 1
    return -1
  })
}