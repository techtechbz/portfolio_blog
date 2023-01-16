import { ALL_POSTS_PATH_PATTERN } from "@/common/constants/blogCategories"


export const getRecentMdFilePaths = async (): Promise<ReadonlyArray<string>> => {
  const glob = require("glob")
  const currentTime = new Date().getTime()
  // 期限の日数
  const limitDays = 14
  
  // 期限日分のコンマ秒数
  const diffTime = limitDays * 24 * 60 * 60 * 1000

  const fetchedStatus = await glob.Glob(ALL_POSTS_PATH_PATTERN, {absolute: true, nodir: true, stat: true, sync: true})
  const foundFilePaths = fetchedStatus.found.filter((filePath: string) => {
    const fileCtime = fetchedStatus.statCache[filePath].ctime.getTime()
    return fileCtime - currentTime <= diffTime
  })
  return foundFilePaths
}