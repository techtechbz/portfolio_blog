import { GetStaticProps, GetStaticPaths } from "next"

import { ParsedUrlQuery } from "querystring"

import { searchResult } from "@/types/searchResult";
import SearchResultPageLayout from "@/layouts/perPage/posts/SearchResultPageLayout"
import fetchingSearchedArchivePostsData from "@/lib/posts/fetchers/searchPosts/searchingPostArchives";
import { PostArchives } from "@/lib/posts/dataHandler/postArchives";


interface Params extends ParsedUrlQuery {
  month: string
}

type Props = {
  searchResultData: searchResult
  retrievedContent: string
  isDesktop: boolean
}

const postArchives = new PostArchives()

export default function PostSearchPage({ searchResultData, retrievedContent, isDesktop }: Props) {
  return(
    <SearchResultPageLayout {...{searchResultData, retrievedContent, isDesktop}} />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: postArchives.archivesParams,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params
  const searchResultData = await fetchingSearchedArchivePostsData(params.month)
  const retrievedContent = `アーカイブ【${postArchives.getArchivesText(params.month)}】`
  return {
    props: {
      title: "検索結果",
      description: "サイト内投稿の検索結果です。",
      searchResultData,
      retrievedContent
    }
  }
}
