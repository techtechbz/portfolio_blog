import {expect} from '@jest/globals'
import type {MatcherFunction} from 'expect'


const isValidFixedPageId = (id: string): boolean => {
  return /^fixed\/(site-introduction|privacy-policy)$/.exec(id) !== null
}

const toBeFetchedFixedPageData: MatcherFunction = 
  function (actual: {id?: string, contentHtml?: string}) {
    // id
    if (actual.id === undefined) return {message: () => `Fixed page's id is undefined. Make sure that the post data is fetched correctly.`, pass: false}
    if (!isValidFixedPageId(actual.id)) return {message: () => `Fixed page's id (${actual.id}) is not valid. Check 'postId'.`, pass: false}

    // contentHtml
    if (actual.contentHtml === undefined) return {message: () => `contentHtml of Fixed page (${actual.id}) is undefined. Make sure that the post html data is fetched correctly.`, pass: false}
    if (typeof actual.contentHtml !== 'string') return {message: () => `Fixed page (${actual.id}) contentHtml's type is not string. Make sure that correct data is passed.`, pass: false}

    return {message: () => `Post page data is correctly fetched.`, pass: true}
  }

expect.extend({toBeFetchedFixedPageData,});

declare module 'expect' {
  interface AsymmnetricMatchers {
    toBeFetchedFixedPageData: void;
  }
  interface Matchers<R> {
    toBeFetchedFixedPageData: R
  }
}