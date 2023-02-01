import fs from 'fs'
import matter from "gray-matter"

import { fixedPageMatterResultOverviews } from '@/types/matterResultData'
import { PostDataValidator } from '../../dataHandler/PostDataValidator'
import { MdFilePath } from '../mdFilePath'


export class FixedPageMatterResultData{
  private readonly postDataValidator = new PostDataValidator()
  private readonly mdFilePath: MdFilePath
  readonly matterResultOverviews: {createDate?: string, updateDate?: string}
  readonly matterResultContent: string

  constructor(mdFilePath: MdFilePath) {
    this.mdFilePath = mdFilePath
    const fileContents = fs.readFileSync(mdFilePath.fullPath, "utf8")
    const { data, content } = matter(fileContents)
    const fetchedMatterResultOverviews = {id: this.mdFilePath.postId, ...data} as fixedPageMatterResultOverviews
    this.postDataValidator.fixedPageMatterResultOverviewsValidator(fetchedMatterResultOverviews)
    this.postDataValidator.postContentValidator(content)
    this.matterResultOverviews = fetchedMatterResultOverviews
    this.matterResultContent = content
  }
}