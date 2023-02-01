import {expect} from '@jest/globals'
import type {MatcherFunction} from 'expect'

import { PostDataValidator } from '@/lib/posts/dataHandler/PostDataValidator'
import { postPageData } from '@/types/matterResultData'


const postDataValidator = new PostDataValidator()

const toBeFetchedPostPageData: MatcherFunction = 
  function (actual: postPageData) {
    try {
      postDataValidator.postPageDataValidator(actual)
    } catch(e: unknown) {
      return {message: () => e.message, pass: false}
    }
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