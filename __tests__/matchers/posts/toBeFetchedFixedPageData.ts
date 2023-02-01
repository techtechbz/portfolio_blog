import {expect} from '@jest/globals'
import type {MatcherFunction} from 'expect'

import { fixedPageData } from '@/types/matterResultData'
import { PostDataValidator } from '@/lib/posts/dataHandler/PostDataValidator'


const postDataValidator = new PostDataValidator()

const toBeFetchedFixedPageData: MatcherFunction = 
  function (actual: fixedPageData) {
    try {
      postDataValidator.fixedPageDataValidator(actual)
    } catch(e: unknown) {
      return {message: () => e.message, pass: false}
    }
    return {message: () => `Post page data is correctly fetched.`, pass: true}
  };

expect.extend({toBeFetchedFixedPageData,});

declare module 'expect' {
  interface AsymmnetricMatchers {
    toBeFetchedFixedPageData: void;
  }
  interface Matchers<R> {
    toBeFetchedFixedPageData: R
  }
}