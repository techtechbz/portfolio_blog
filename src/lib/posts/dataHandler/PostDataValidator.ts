import fs from 'fs'

import { postMatterResultOverviews, fixedPageMatterResultOverviews, postPageData, fixedPageData } from '@/types/matterResultData'
import { RegExpMdFilePathPatterns } from './mdFilePathPatterns'


export class PostDataValidator {
  private readonly regExpMdFilePathPatterns = new RegExpMdFilePathPatterns()

  readonly postIdValidator = (postId?: string): void => {
    if (typeof postId !== 'string') {
      throw new Error('IDが指定されていません。')
    } else {
      if (!this.regExpMdFilePathPatterns.postIdPattern.exec(postId)) throw new Error(`postId(${postId})が有効ではありません`)
      fs.statSync(`/app/postsMd/${postId}.md`)
    }
  }

  readonly stringTypeValidator = (dataName: string, value?: string): void => {
    if (typeof value !== 'string') throw new Error(`${dataName}: データ形式が文字列ではありません。`)
  }

  readonly postDateValidator = (dateString?: string): void => {
    if (typeof dateString !== 'string') throw new Error('日時が指定されていません。')
    const writtenPostMonth = Number(dateString.split('-')[1])
    const postDate = new Date(dateString.replace(/-/g, "/"))
    const parsedPostYear = postDate.getFullYear() 
    const parsedPostMonth = postDate.getMonth()
    if (parsedPostYear < 2022 || parsedPostYear > 2099) throw new Error('投稿年は2022~2099の間で指定してください。')
    if (parsedPostMonth < 0 || parsedPostMonth >= 12) throw new Error('投稿月は1~12の間で指定してください。')
    if (parsedPostMonth !== writtenPostMonth - 1) throw new Error('日時が変わっています。')
  }

  readonly eyecatchFileValidator = (fileName?: string): void => {
    if (typeof fileName !== 'string') throw new Error('ファイル名が指定されていません。')
    if (/^[\w-]+\.jpg$/.exec(fileName) === null) throw new Error('ファイル形式はJPEGのみです。')
    const fileNameWithoutExtension = fileName.split('.')[0]
    fs.statSync(`/app/public/images/${fileNameWithoutExtension}.jpg`)
  }

  readonly postsIdsListValidator = (postIdsList?: ReadonlyArray<string>): void => {
    if (postIdsList === undefined) throw new Error('IDリストが指定されていません。')
    postIdsList.map((id: string) => this.postIdValidator(id))
  }

  readonly postContentValidator = (content?: string): void => {
    this.stringTypeValidator("content", content)
  }
  
  readonly postMatterResultOverviewsValidator = (matterResultOverviews: postMatterResultOverviews): void => {
    this.postIdValidator(matterResultOverviews.id)
    this.stringTypeValidator("title", matterResultOverviews.title)
    this.stringTypeValidator("description", matterResultOverviews.description)
    this.postDateValidator(matterResultOverviews.date)
    this.eyecatchFileValidator(matterResultOverviews.eyecatchFile)
    this.postsIdsListValidator(matterResultOverviews.relatedPostsIds)
  }

  readonly postPageDataValidator = (postPageData: postPageData): void => {
    this.postMatterResultOverviewsValidator(postPageData)
    this.stringTypeValidator('contentHtml', postPageData.contentHtml)
  }

  readonly fixedPageMatterResultOverviewsValidator = (matterResultOverviews: fixedPageMatterResultOverviews): void => {
    if (matterResultOverviews.updateDate !== undefined) { 
      const createDate = new Date(matterResultOverviews.createDate)
      const updateDate = new Date(matterResultOverviews.updateDate)
      this.postDateValidator(matterResultOverviews.createDate)
      this.postDateValidator(matterResultOverviews.updateDate)
      if (createDate > updateDate) throw new Error('更新日時が作成日時以前に設定されています。')
    }
    if (matterResultOverviews.createDate !== undefined) this.postDateValidator(matterResultOverviews.createDate)
  }

  readonly fixedPageDataValidator = (fixedPageData: fixedPageData): void => {
    this.fixedPageMatterResultOverviewsValidator(fixedPageData)
    this.stringTypeValidator("conetntHtml", fixedPageData.contentHtml)
  }
}