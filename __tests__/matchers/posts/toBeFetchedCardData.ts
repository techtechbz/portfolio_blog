import fs from 'fs'
import {expect} from '@jest/globals'
import type {MatcherFunction} from 'expect'

import { postsCardDataForTest } from '@/common/types/postData'


const isValidPostId = (id: string): boolean => {
  return /^[a-z]+\/[\w-]+$/.exec(id) !== null
}

const isValidEyecatchFileName = (fileName: string): boolean => {
  return fs.existsSync(`/app/public/images/${fileName}`)
}

const isValidRelatedPostsIds = (postIds: ReadonlyArray<string>): boolean => {
  for (const id of postIds) {
    if (!isValidPostId(id)) return false
  }
  return true
}

const toBeFetchedFeaturedPostsData: MatcherFunction = 
  function (actual: postsCardDataForTest) {
    if (!Array.isArray(actual)) throw new Error('Data type is not array. Make sure that the post data is fetched correctly.')
    for (const data of actual) {
      // id
      if (data.id === undefined) return {message: () => `Post id is undefined. Make sure that the post data is fetched correctly.`, pass: false}
      if (!isValidPostId(data.id)) return {message: () => `This post id (${data.id}) is not valid. Check 'postId'.`, pass: false}

      // title
      if (data.title === undefined) return {message: () => `Post (${data.id}) title is undefined. Make sure that the post title is complemented.`, pass: false}
      if (typeof data.title !== 'string') return {message: () => `Post (${data.id}) title's data type is not string. Make sure that correct data is passed.`, pass: false}
    
      // description
      if (data.description === undefined) return {message: () => `Post (${data.id}) description is undefined. Make sure that the post description is complemented.`, pass: false}
      if (typeof data.description !== 'string') return {message: () => `Post (${data.id}) description's data type is not string. Make sure that correct data is passed.`, pass: false}
    
      // eyecatchFile
      if (data.eyecatchFile === undefined) return {message: () => `Post (${data.id}) Eyecatch file name is undefined. Make sure that the file name is complemented.`, pass: false}
      if (!isValidEyecatchFileName(data.eyecatchFile)) return {message: () => `Post (${data.id}) Eyecatch file name is not valid. Make sure that the file name is correct.`, pass: false}
    
      // relatedPostsIds
      if (data.relatedPostsIds === undefined) return {message: () => `RelatedPostsIds of post (${data.id}) is undefined. Make sure that the post title is complemented.`, pass: false}
      if (!Array.isArray(data.relatedPostsIds))return {message: () => `RelatedPostsIds of post (${data.id}) is not valid. Make sure that correct data is passed.`, pass: false}
      if (!isValidRelatedPostsIds(data.relatedPostsIds)) return {message: () => `RelatedPostsIds is not valid. Make sure Make sure that post ids are correct.`, pass: false}
    };
    return {message: () => `FeaturedPostsData is valid.`, pass: true}
  }

const toBeFetchedRecentPostsData: MatcherFunction = 
  function (actual: postsCardDataForTest) {
    if (!Array.isArray(actual)) throw new Error('Data type is not array. Make sure that the post data is fetched correctly.')
    for (const data of actual) {
      // id
      if (data.id === undefined) return {message: () => `Post id is undefined. Make sure that the post data is fetched correctly.`, pass: false}
      if (!isValidPostId(data.id)) return {message: () => `This post id (${data.id}) is not valid. Check 'postId'.`, pass: false}

      // title
      if (data.title === undefined) return {message: () => `Post (${data.id}) title is undefined. Make sure that the post title is complemented.`, pass: false}
      if (typeof data.title !== 'string') return {message: () => `Post (${data.id}) title's data type is not string. Make sure that correct data is passed.`, pass: false}
    
      // description
      if (data.description === undefined) return {message: () => `Post (${data.id}) description is undefined. Make sure that the post description is complemented.`, pass: false}
      if (typeof data.description !== 'string') return {message: () => `Post (${data.id}) description's data type is not string. Make sure that correct data is passed.`, pass: false}
    
      // eyecatchFile
      if (data.eyecatchFile === undefined) return {message: () => `Post (${data.id}) Eyecatch file name is undefined. Make sure that the file name is complemented.`, pass: false}
      if (!isValidEyecatchFileName(data.eyecatchFile)) return {message: () => `Post (${data.id}) Eyecatch file name is not valid. Make sure that the file name is correct.`, pass: false}
    
      // relatedPostsIds
      if (data.relatedPostsIds === undefined) return {message: () => `RelatedPostsIds of post (${data.id}) is undefined. Make sure that the post title is complemented.`, pass: false}
      if (!Array.isArray(data.relatedPostsIds))return {message: () => `RelatedPostsIds of post (${data.id}) is not valid. Make sure that correct data is passed.`, pass: false}
      if (!isValidRelatedPostsIds(data.relatedPostsIds)) return {message: () => `RelatedPostsIds is not valid. Make sure Make sure that post ids are correct.`, pass: false}

      // contentHtml
      if (data.contentHtml === undefined) return {message: () => `contentHtml of post (${data.id}) is undefined. Make sure that the post html data is fetched correctly.`, pass: false}
      if (typeof data.contentHtml !== 'string') return {message: () => `Post (${data.id}) contentHtml's type is not string. Make sure that correct data is passed.`, pass: false}
    };
    return {message: () => `RecentPostsData is valid.`, pass: true}
  }

expect.extend({toBeFetchedFeaturedPostsData, toBeFetchedRecentPostsData});

declare module 'expect' {
  interface AsymmnetricMatchers {
    toBeFetchedFeaturedPostsData: void;
    toBeFetchedRecentPostsData: void;
  }
  interface Matchers<R> {
    toBeFetchedFeaturedPostsData: R
    toBeFetchedRecentPostsData: R
  }
}