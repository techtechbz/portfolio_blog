import { ARCHIVES_LIST } from "@/common/constants/archivesList"
import { ALL_POSTS_PATH_PATTERN } from "@/common/constants/blogCategories"
import { searchResult } from "@/common/types/searchResult"
import { getRecentPostsData } from "../fetchCardData/getRecentPostsData"


const getSearchedArchiveFilePaths = async (monthString: string): Promise<ReadonlyArray<string>> => {
  const glob = require("glob")
  const [ searchYear, searchMonth ] = monthString.split("-").map((dateString: string) => Number(dateString))

  const fetchedStatus = await glob.Glob(ALL_POSTS_PATH_PATTERN, {absolute: true, nodir: true, stat: true, sync: true})
  const foundFileIds = fetchedStatus.found.filter((filePath: string) => {
    const fileCtime = fetchedStatus.statCache[filePath].ctime
    return searchYear === fileCtime.getFullYear() && searchMonth - 1 === fileCtime.getMonth()
  })
  return foundFileIds
}

export const getSearchedArchivePostsData = async (monthString: string): Promise<searchResult> => {
  if (monthString in ARCHIVES_LIST) {
    const foundPostsFilePaths = await getSearchedArchiveFilePaths(monthString)
    const foundPostsData = await getRecentPostsData(foundPostsFilePaths)
    if (foundPostsData.length >= 1) return {foundPostsData: foundPostsData, resultMessage: `アーカイブ : ${ARCHIVES_LIST[monthString].text}`};
  }
  return {foundPostsData: [], resultMessage: "お探しのアーカイブの記事は見つかりませんでした。"}
}