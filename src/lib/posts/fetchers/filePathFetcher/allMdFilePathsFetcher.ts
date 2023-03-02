import { globSync } from 'glob'

import { MdFilePath } from "../../valueObjects/mdFilePath"
import { MdFilePathsFetcher } from './mdFilePathsFetcher'


export class AllMdFilePathsFetcher extends MdFilePathsFetcher {
  private get allPostsPaths(): ReadonlyArray<string> {
    return globSync(this.globMdFilePathPattern.globAllPostsPathPattern, {absolute: true, nodir: true}) as ReadonlyArray<string>
  }
  get allPostMdFilePaths(): ReadonlyArray<MdFilePath> {
    return this.mdFilePathClassList(this.allPostsPaths)
  }
}
