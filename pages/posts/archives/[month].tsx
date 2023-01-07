import { GetStaticProps, GetStaticPaths } from "next"

import { ParsedUrlQuery } from "querystring"

import { getSearchedArchivePostsData } from "src/lib/posts/searchPosts/getSearchedArchiveFileIds";
import { ARCHIVES_LIST } from "src/common/constants/archivesList";
import { searchResult } from "src/common/types/searchResult";
import SearchResultPageLayout from "src/components/layouts/perPage/posts/SearchResultPageLayout"


interface Params extends ParsedUrlQuery {
  month: string
}

type Props = {
  searchResultData: searchResult
  isMobile: boolean
}

export default function PostSearchPage({ searchResultData, isMobile }: Props) {
  return(
    <SearchResultPageLayout {...{searchResultData, isMobile}} />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const archiveParams = Object.keys(ARCHIVES_LIST).map((month) => ({params: {month}}))
  return {
    paths: archiveParams,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params
  const searchResultData = await getSearchedArchivePostsData(params.month)
  return {
    props: {
      title: "検索結果",
      description: "サイト内投稿の検索結果です。",
      searchResultData
    }
  }
}
