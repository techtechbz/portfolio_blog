import {expect} from '@jest/globals'
import type {MatcherFunction} from 'expect'

import { postsDataForTest } from '@/common/types/postData'


const isValidPostId = (id: string): boolean => {
  return /^[a-z]+\/[\w-]+$/.exec(id) !== null
}

const isValidEyecatchFileName = (fileName: string): boolean => {
  return /^[\w-]+\.jpg/.exec(fileName) !== null
}

const isValidRelatedPostsIds = (postIds: ReadonlyArray<string>): boolean => {
  if (postIds.length === 0) return true
  postIds.forEach(id => {
    if (!isValidPostId(id)) return false
  })
  return true
}

const toBeFetchedFeaturedPostsData: MatcherFunction = 
  function (actual: postsDataForTest) {
    if (!Array.isArray(actual)) throw new Error('Data is not array')
    actual.forEach(data => {
      // id
      if (data.id === undefined) return {message: () => "Post id is undefined. Make sure that the post data is fetched correctly.", pass: false}
      if (!isValidPostId(data.id)) return {message: () => `This post id (${data.id}) is not valid. Check 'postId'.`, pass: false}

      // title
      if (data.title === undefined) return {message: () => "Post title is undefined. Make sure that the post title is complemented.", pass: false}
      if (typeof data.title !== 'string') return {message: () => "Post title's data type is not string. Make sure that correct data is passed.", pass: false}
    
      // description
      if (data.description === undefined) return {message: () => "Post description is undefined. Make sure that the post description is complemented.", pass: false}
      if (typeof data.description !== 'string') return {message: () => "Post description's data type is not string. Make sure that correct data is passed.", pass: false}
    
      // eyecatchFile
      if (data.eyecatchFile === undefined) return {message: () => "Eyecatch file name is undefined. Make sure that the file name is complemented.", pass: false}
      if (!isValidEyecatchFileName(data.eyecatchFile)) return {message: () => "Eyecatch file name is not valid. Make sure that the file name is correct.", pass: false}
    
      // relatedPostsIds
      if (data.relatedPostsIds === undefined) return {message: () => "RelatedPostsIds is undefined. Make sure that the post title is complemented.", pass: false}
      if (!Array.isArray(data.relatedPostsIds))return {message: () => "RelatedPostsIds is not valid. Make sure that correct data is passed.", pass: false}
      if (!isValidRelatedPostsIds(data.relatedPostsIds)) return {message: () => "RelatedPostsIds is not valid. Make sure Make sure that post ids are correct."}
    });

    return {message: () => "FeaturedPostsData is valid.", pass: true}
  }

const toBeFetchedRecentPostsData: MatcherFunction = 
  function (actual: postsDataForTest) {
    if (!Array.isArray(actual)) throw new Error('Data is not array')
    actual.forEach(data => {
      // id
      if (data.id === undefined) return {message: () => "Post id is undefined. Make sure that the post data is fetched correctly.", pass: false}
      if (!isValidPostId(data.id)) return {message: () => `This post id (${data.id}) is not valid. Check 'postId'.`, pass: false}

      // title
      if (data.title === undefined) return {message: () => "Post title is undefined. Make sure that the post title is complemented.", pass: false}
      if (typeof data.title !== 'string') return {message: () => "Post title's data type is not string. Make sure that correct data is passed.", pass: false}
    
      // description
      if (data.description === undefined) return {message: () => "Post description is undefined. Make sure that the post description is complemented.", pass: false}
      if (typeof data.description !== 'string') return {message: () => "Post description's data type is not string. Make sure that correct data is passed.", pass: false}
    
      // eyecatchFile
      if (data.eyecatchFile === undefined) return {message: () => "Eyecatch file name is undefined. Make sure that the file name is complemented.", pass: false}
      if (!isValidEyecatchFileName(data.eyecatchFile)) return {message: () => "Eyecatch file name is not valid. Make sure that the file name is correct.", pass: false}
    
      // relatedPostsIds
      if (data.relatedPostsIds === undefined) return {message: () => "RelatedPostsIds is undefined. Make sure that the post title is complemented.", pass: false}
      if (!Array.isArray(data.relatedPostsIds))return {message: () => "RelatedPostsIds is not valid. Make sure that correct data is passed.", pass: false}
      if (!isValidRelatedPostsIds(data.relatedPostsIds)) return {message: () => "RelatedPostsIds is not valid. Make sure Make sure that post ids are correct."}

      // contentHtml
      if (data.contentHtml === undefined) return {message: () => "contentHtml is undefined. Make sure that the post html data is fetched correctly.", pass: false}
      if (typeof data.contentHtml !== 'string') return {message: () => "contentHtml's type is not string. Make sure that correct data is passed.", pass: false}
    });
    

    return {message: () => "RecentPostsData is valid.", pass: true}
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