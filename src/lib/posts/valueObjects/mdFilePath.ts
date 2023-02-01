import fs from 'fs'

import { RegExpMdFilePathPatterns } from '../dataHandler/mdFilePathPatterns';


export class MdFilePath {
  private readonly regExpMdFilePathPatterns = new RegExpMdFilePathPatterns()
  readonly postId: string = "empty"
  readonly fullPath: string = "empty"

  constructor(type: "id" | "fullPath", path: string) {
    if (type === "id") {
      this.fullPath = this.constructFullPathFromPostId(path)
      this.postId = path
    } else if (type === "fullPath") {
      this.postId = this.constructPostIdFromFullPath(path)
      this.fullPath = path
    } else {
      throw new Error('typeが有効ではありません。「"id"」もしくは「"fullPath"」を指定してください。')
    }
  }

  private readonly constructFullPathFromPostId = (postId: string) => {
    if (!this.regExpMdFilePathPatterns.postIdPattern.exec(postId)) throw new Error(`(${postId}) IDが有効ではありません。`)
    const fullPath = `/app/postsMd/${postId}.md`
    fs.statSync(fullPath)
    return fullPath
  }

  private readonly constructPostIdFromFullPath = (fullPath: string) => {
    if (!this.regExpMdFilePathPatterns.fullMdFilePathPattern.exec(fullPath)) throw new Error(`(${fullPath}) ファイルパスが有効ではありません。`)
    const fullPathWithoutExtension = fullPath.split('.')[0]
    fs.statSync(`${fullPathWithoutExtension}.md`)
    return fullPath.replace(this.regExpMdFilePathPatterns.fullMdFilePathPattern, "$1")
  }
}