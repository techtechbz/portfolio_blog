import fs from 'fs'

import { postMatterResultOverviews, fixedPageMatterResultOverviews, postPageData, fixedPageData } from '@/types/matterResultData'
import { RegExpMdFilePathPatterns } from './mdFilePathPatterns'


export class PostDataValidator {
  private readonly regExpMdFilePathPatterns = new RegExpMdFilePathPatterns()

  readonly postIdValidator = (postId?: string) => {
    if (typeof postId !== 'string') {
      throw new Error('IDが指定されていません。')
    } else {
      if (!this.regExpMdFilePathPatterns.postIdPattern.exec(postId)) throw new Error(`postId(${postId})が有効ではありません`)
      fs.statSync(`/app/postsMd/${postId}.md`)
    }
  }

  readonly stringTypeValidator = (dataName: string, value?: string) => {
    if (typeof value !== 'string') throw new Error(`${dataName}: データ形式が文字列ではありません。`)
  }

  readonly postDateValidator = (dateString?: string) => {
    if (typeof dateString !== 'string') { 
      throw new Error('日時が指定されていません。')
    } else {
      try {
        new Date(dateString.replace(/-/g, "/"))
      } catch (error) {
        throw new Error('date文字列を日時に変換できません。')
      }
    }
  }

  readonly eyecatchFileValidator = (fileName?: string) => {
    if (typeof fileName !== 'string') { 
      throw new Error('ファイル名が指定されていません。')
    } else {
      if (/^[\w-]+\.jpg$/.exec(fileName) === null) throw new Error('ファイル形式はJPEGのみです。')
      const fileNameWithoutExtension = fileName.split('.')[0]
      fs.statSync(`/app/public/images/${fileNameWithoutExtension}.jpg`)
    }
  }

  readonly postsIdsListValidator = (postIdsList?: ReadonlyArray<string>) => {
    if (postIdsList === undefined) {
      throw new Error('IDリストが指定されていません。')
    } else {
      postIdsList.map((id: string) => this.postIdValidator(id))
    }
  }

  readonly postContentValidator = (content?: string) => {
    this.stringTypeValidator("content", content)
  }
  
  readonly postMatterResultOverviewsValidator = (matterResultOverviews: postMatterResultOverviews) => {
    this.postIdValidator(matterResultOverviews.id)
    this.stringTypeValidator("title", matterResultOverviews.title)
    this.stringTypeValidator("description", matterResultOverviews.description)
    this.postDateValidator(matterResultOverviews.date)
    this.eyecatchFileValidator(matterResultOverviews.eyecatchFile)
    this.postsIdsListValidator(matterResultOverviews.relatedPostsIds)
  }

  readonly postPageDataValidator = (postPageData: postPageData) => {
    this.postMatterResultOverviewsValidator(postPageData)
    this.stringTypeValidator('contentHtml', postPageData.contentHtml)
  }

  readonly fixedPageMatterResultOverviewsValidator = (matterResultOverviews: fixedPageMatterResultOverviews) => {
    if (matterResultOverviews.createDate !== undefined) this.postDateValidator(matterResultOverviews.createDate)
    if (matterResultOverviews.updateDate !== undefined) this.postDateValidator(matterResultOverviews.updateDate)
  }

  readonly fixedPageDataValidator = (fixedPageData: fixedPageData) => {
    this.fixedPageMatterResultOverviewsValidator(fixedPageData)
    this.stringTypeValidator("conetntHtml", fixedPageData.contentHtml)
  }
}