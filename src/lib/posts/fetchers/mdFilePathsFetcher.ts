import { statSync } from 'node:fs';

import { globSync } from 'glob'

import { GlobMdFilePathPatterns } from "../dataHandler/mdFilePathPatterns"
import { MdFilePath } from "../valueObjects/mdFilePath"


interface postStatus {
  fullPath: string
  ctime: Date
}

export class MdFilePathsFetcher {
  private readonly globMdFilePathPattern = new GlobMdFilePathPatterns()

  private mdFilePathClassList(pathList: ReadonlyArray<string>): ReadonlyArray<MdFilePath> {
    return pathList.map((path: string) => new MdFilePath("fullPath", path))
  }
  
  private get allPostsPaths(): ReadonlyArray<string> {
    return globSync(this.globMdFilePathPattern.globAllPostsPathPattern, {absolute: true, nodir: true}) as ReadonlyArray<string>
  }

  private get allFilePathsWithCtime(): ReadonlyArray<postStatus> {
    return this.allPostsPaths.map((path: string) => {
      return {fullPath: path, ctime: statSync(path).ctime}
    })
  }
  
  get allMdFilePathClass(): ReadonlyArray<MdFilePath> {
    return this.mdFilePathClassList(this.allPostsPaths)
  }

  get recentPostPaths(): ReadonlyArray<MdFilePath> {
    const currentTime = new Date().getTime()
    // 期限の日数(2週間)
    const limitDays = 14

    // 期限日分のコンマ秒数
    const diffTime = limitDays * 24 * 60 * 60 * 1000
    const foundFilePaths = this.allFilePathsWithCtime.flatMap((status: postStatus) => {
      if (status.ctime.getTime() - currentTime <= diffTime) return status.fullPath
      return []
    })
    return this.mdFilePathClassList(foundFilePaths)
  }

  readonly searchedCategoryPostPaths = (category: string): ReadonlyArray<MdFilePath> => {
    const searchedCategoryPostPattern = this.globMdFilePathPattern.specificCategoryPostsPathPattern(category)
    const searchedPathsList = globSync(searchedCategoryPostPattern, {absolute: true, nodir: true})
    return this.mdFilePathClassList(searchedPathsList)
  }
  
  readonly searchedArchivePostPaths = (monthString: string): ReadonlyArray<MdFilePath> => {
    const [ searchYear, searchMonth ] = monthString.split("-").map((dateString: string) => Number(dateString))

    const foundFilePaths = this.allFilePathsWithCtime.flatMap((status: postStatus) => {
      if (searchYear === status.ctime.getFullYear() && searchMonth - 1 === status.ctime.getMonth()) return status.fullPath
      return []
    })
    return this.mdFilePathClassList(foundFilePaths)
  }
}
