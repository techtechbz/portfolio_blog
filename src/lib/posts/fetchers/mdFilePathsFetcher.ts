import { globSync } from 'glob'

import { convertToDate } from '../dataHandler/formatDateString'

import { GlobMdFilePathPatterns } from "../dataHandler/mdFilePathPatterns"
import { PostMatterResultData } from '../valueObjects/matterResultData/postMatterResultData'
import { MdFilePath } from "../valueObjects/mdFilePath"


export class MdFilePathsFetcher {
  private readonly globMdFilePathPattern = new GlobMdFilePathPatterns()

  private mdFilePathClassList(pathList: ReadonlyArray<string>): ReadonlyArray<MdFilePath> {
    return pathList.map((path: string) => new MdFilePath("fullPath", path))
  }
  
  private get allPostsPaths(): ReadonlyArray<string> {
    return globSync(this.globMdFilePathPattern.globAllPostsPathPattern, {absolute: true, nodir: true}) as ReadonlyArray<string>
  }
  
  get allMdFilePathClass(): ReadonlyArray<MdFilePath> {
    return this.mdFilePathClassList(this.allPostsPaths)
  }

  get recentPostPaths(): ReadonlyArray<MdFilePath> {
    const currentTime = new Date().getTime()
    // 期限の日数(2週間)
    const limitDays = 31
    // 期限日分のコンマ秒数
    const diffTime = limitDays * 24 * 60 * 60 * 1000
    const foundFilePaths = this.mdFilePathClassList(this.allPostsPaths).filter((mdFilePath: MdFilePath) => {
      const matterResult = new PostMatterResultData(mdFilePath)
      const postDate = convertToDate(matterResult.matterResultOverviews.date)
      return postDate.getTime() - currentTime <= diffTime
    })
    return foundFilePaths
  }

  readonly searchedCategoryPostPaths = (category: string): ReadonlyArray<MdFilePath> => {
    const searchedCategoryPostPattern = this.globMdFilePathPattern.specificCategoryPostsPathPattern(category)
    const searchedPathsList = globSync(searchedCategoryPostPattern, {absolute: true, nodir: true})
    return this.mdFilePathClassList(searchedPathsList)
  }
  
  readonly searchedArchivePostPaths = (monthString: string): ReadonlyArray<MdFilePath> => {
    const [ searchYear, searchMonth ] = monthString.split("-").map((dateString: string) => Number(dateString))

    const foundFilePaths = this.mdFilePathClassList(this.allPostsPaths).filter((mdFilePath: MdFilePath) => {
      const matterResult = new PostMatterResultData(mdFilePath)
      const postDate = convertToDate(matterResult.matterResultOverviews.date)
      return searchYear === postDate.getFullYear() && searchMonth - 1 === postDate.getMonth()
    })
    return foundFilePaths
  }
}
