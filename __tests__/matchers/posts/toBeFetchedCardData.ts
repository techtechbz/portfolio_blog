import {expect} from '@jest/globals'
import type {MatcherFunction} from 'expect'

import { PostDataValidator } from '@/lib/posts/dataHandler/PostDataValidator'
import { featuredPostsCardData, recentPostsCardData } from '@/types/cardData'


const postDataValidator = new PostDataValidator()

const toBeFetchedFeaturedPostsCardData: MatcherFunction = 
  function (actual: featuredPostsCardData) {
    if (!Array.isArray(actual)) throw new Error('Data type is not array. Make sure that the post data is fetched correctly.')
    try {
      actual.map((overviews) => postDataValidator.postMatterResultOverviewsValidator(overviews))
    } catch(e: unknown) {
      return {message: () => e.message, pass: false}
    }
    return {message: () => `featuredPostsCardData is valid.`, pass: true}
  }

const toBeFetchedRecentPostsCardData: MatcherFunction = 
  function (actual: recentPostsCardData) {
    if (!Array.isArray(actual)) throw new Error('Data type is not array. Make sure that the post data is fetched correctly.')
    try {
      actual.map((overviews) => postDataValidator.postPageDataValidator(overviews))
    } catch(e: unknown) {
      return {message: () => e.message, pass: false}
    }
    return {message: () => `recentPostsCardData is valid.`, pass: true}
  }

expect.extend({toBeFetchedFeaturedPostsCardData, toBeFetchedRecentPostsCardData});

declare module 'expect' {
  interface AsymmnetricMatchers {
    toBeFetchedFeaturedPostsCardData: void;
    toBeFetchedRecentPostsCardData: void;
  }
  interface Matchers<R> {
    toBeFetchedFeaturedPostsCardData: R
    toBeFetchedRecentPostsCardData: R
  }
}