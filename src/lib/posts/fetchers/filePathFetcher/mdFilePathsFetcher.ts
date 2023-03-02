import { GlobMdFilePathPatterns } from "../../dataHandler/mdFilePathPatterns"
import { MdFilePath } from "../../valueObjects/mdFilePath"


export class MdFilePathsFetcher {
  protected readonly globMdFilePathPattern = new GlobMdFilePathPatterns()

  protected mdFilePathClassList(pathList: ReadonlyArray<string>): ReadonlyArray<MdFilePath> {
    return pathList.map((path: string) => new MdFilePath("fullPath", path))
  }
}