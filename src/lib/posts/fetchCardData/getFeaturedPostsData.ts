import { postData } from "src/common/types/postData"
import { getMatterResultData } from "../globFileData/getMatterResultData"

export const getFeaturedPostsData = async (idList: ReadonlyArray<string>): Promise<ReadonlyArray<postData>> => {
  const getPostDataList = () => idList.map(async (id: string) => {
    const matterResultData = (await getMatterResultData(`/app/postsMd/${id}.md`)).data
    return { ...matterResultData, id } as postData
  })
  return Promise.all(getPostDataList())
}