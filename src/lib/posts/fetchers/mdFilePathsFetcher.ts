import { GlobMdFilePathPatterns } from "../dataHandler/mdFilePathPatterns"
import { MdFilePath } from "../valueObjects/mdFilePath"


export class MdFilePathsFetcher {
  private readonly glob = require("glob")
  private readonly globMdFilePathPattern = new GlobMdFilePathPatterns()

  private mdFilePathClassList(pathList: ReadonlyArray<string>): ReadonlyArray<MdFilePath> {
    return pathList.map((path: string) => new MdFilePath("fullPath", path))
  }
  
  readonly allMdFilePaths = (): ReadonlyArray<MdFilePath> => {
    const allFetchedMdFilesPaths = this.glob.sync(this.globMdFilePathPattern.globAllPostsPathPattern, {absolute: true, nodir: true}) as ReadonlyArray<string>
    return this.mdFilePathClassList(allFetchedMdFilesPaths)
  }

  private readonly getFilePathsWithStat = async () => {
    return await this.glob.Glob(this.globMdFilePathPattern.globAllPostsPathPattern, {absolute: true, nodir: true, stat: true, sync: true})
  }

  readonly recentPostPaths = async (): Promise<ReadonlyArray<MdFilePath>> => {
    const currentTime = new Date().getTime()
    // 期限の日数
    const limitDays = 14

    // 期限日分のコンマ秒数
    const diffTime = limitDays * 24 * 60 * 60 * 1000
    const fetchedStatus = await this.getFilePathsWithStat()
    const foundFilePaths = fetchedStatus.found.filter((filePath: string) => {
      const fileCtime = fetchedStatus.statCache[filePath].ctime.getTime()
      return fileCtime - currentTime <= diffTime
    })
    return this.mdFilePathClassList(foundFilePaths)
  }

  readonly searchedCategoryPostPaths = async (category: string): Promise<ReadonlyArray<MdFilePath>> => {
    const searchedCategoryPostPattern = this.globMdFilePathPattern.specificCategoryPostsPathPattern(category)
    const searchedPathsList = this.glob.sync(searchedCategoryPostPattern, {absolute: true, nodir: true})
    return this.mdFilePathClassList(searchedPathsList)
  }
  
  readonly searchedArchivePostPaths = async (monthString: string): Promise<ReadonlyArray<MdFilePath>> => {
    const [ searchYear, searchMonth ] = monthString.split("-").map((dateString: string) => Number(dateString))
  
    const fetchedStatus = await this.getFilePathsWithStat()
    const foundFilePaths = fetchedStatus.found.filter((filePath: string) => {
      const fileCtime = fetchedStatus.statCache[filePath].ctime
      return searchYear === fileCtime.getFullYear() && searchMonth - 1 === fileCtime.getMonth()
    })
    return this.mdFilePathClassList(foundFilePaths)
  }
}
