import {expect} from '@jest/globals'
import type {MatcherFunction} from 'expect'

import { postPageDataForTest } from '@/types/postData'


const isValidPostId = (id: string): boolean => {
  return /^[a-z]+\/[\w-]+$/.exec(id) !== null
}

const isValidEyecatchFileName = (fileName: string): boolean => {
  return /^[\w-]+\.jpg/.exec(fileName) !== null
}

const isValidRelatedPostsIds = (postIds: ReadonlyArray<string>): boolean => {
  for (const id of postIds) {
    if (!isValidPostId(id)) return false
  }
  return true
}

const toBeFetchedPostPageData: MatcherFunction = 
  function (actual: postPageDataForTest) {
    // id
    if (actual.id === undefined) return {message: () => `Post id is undefined. Make sure that the post data is fetched correctly.`, pass: false}
    if (!isValidPostId(actual.id)) return {message: () => `This post id (${actual.id}) is not valid. Check 'postId'.`, pass: false}

    // title
    if (actual.title === undefined) return {message: () => `Post (${actual.id}) title is undefined. Make sure that the post title is complemented.`, pass: false}
    if (typeof actual.title !== 'string') return {message: () => `Post (${actual.id}) title's data type is not string. Make sure that correct data is passed.`, pass: false}
  
    // description
    if (actual.description === undefined) return {message: () => `Post (${actual.id}) description is undefined. Make sure that the post description is complemented.`, pass: false}
    if (typeof actual.description !== 'string') return {message: () => `Post (${actual.id}) description's data type is not string. Make sure that correct data is passed.`, pass: false}
  
    // eyecatchFile
    if (actual.eyecatchFile === undefined) return {message: () => `Post (${actual.id}) Eyecatch file name is undefined. Make sure that the file name is complemented.`, pass: false}
    if (!isValidEyecatchFileName(actual.eyecatchFile)) return {message: () => `Post (${actual.id}) Eyecatch file name is not valid. Make sure that the file name is correct.`, pass: false}
  
    // relatedPostsIds
    if (actual.relatedPostsIds === undefined) return {message: () => `RelatedPostsIds of post (${actual.id}) is undefined. Make sure that the post title is complemented.`, pass: false}
    if (!Array.isArray(actual.relatedPostsIds))return {message: () => `RelatedPostsIds of post (${actual.id}) is not valid. Make sure that correct data is passed.`, pass: false}
    if (!isValidRelatedPostsIds(actual.relatedPostsIds)) return {message: () => `RelatedPostsIds is not valid. Make sure Make sure that post ids are correct.`, pass: false}

    // contentHtml
    if (actual.contentHtml === undefined) return {message: () => `contentHtml of post (${actual.id}) is undefined. Make sure that the post html data is fetched correctly.`, pass: false}
    if (typeof actual.contentHtml !== 'string') return {message: () => `Post (${actual.id}) contentHtml's type is not string. Make sure that correct data is passed.`, pass: false}

    return {message: () => `Post page data is correctly fetched.`, pass: true}
  }

expect.extend({toBeFetchedPostPageData,});

declare module 'expect' {
  interface AsymmnetricMatchers {
    toBeFetchedPostPageData: void;
  }
  interface Matchers<R> {
    toBeFetchedPostPageData: R
  }
}