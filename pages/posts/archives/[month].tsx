import { GetStaticProps, GetStaticPaths } from "next"

import { ParsedUrlQuery } from "querystring"

import { ARCHIVES_LIST } from "@/constants/archivesList";
import { searchResult } from "@/types/searchResult";
import SearchResultPageLayout from "@/layouts/perPage/posts/SearchResultPageLayout"
import fetchingSearchedArchivePostsData from "@/lib/posts/search/searchingPostArchives";


interface Params extends ParsedUrlQuery {
  month: string
}

type Props = {
  searchResultData: searchResult
  retrievedContent: string
  isDesktop: boolean
}

export default function PostSearchPage({ searchResultData, retrievedContent, isDesktop }: Props) {
  return(
    <SearchResultPageLayout {...{searchResultData, retrievedContent, isDesktop}} />
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
  const searchResultData = await fetchingSearchedArchivePostsData(params.month)
  const retrievedContent = `アーカイブ【${ARCHIVES_LIST[params.month].text}】`
  return {
    props: {
      title: "検索結果",
      description: "サイト内投稿の検索結果です。",
      searchResultData,
      retrievedContent
    }
  }
}
