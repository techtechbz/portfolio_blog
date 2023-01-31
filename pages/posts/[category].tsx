import { GetStaticProps, GetStaticPaths } from "next"

import { ParsedUrlQuery } from "querystring"

import { searchResult } from "@/types/searchResult";
import SearchResultPageLayout from "@/layouts/perPage/posts/SearchResultPageLayout"
import fetchingSearchedCategoryPostsData from "@/lib/posts/search/searchingCategoryPost";
import { PostCategory } from "@/lib/posts/postCategory";


interface Params extends ParsedUrlQuery {
  category: string
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

const postCategory = new PostCategory()

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryParams = postCategory.categoryParams
  return {
    paths: categoryParams,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params
  const searchResultData = await fetchingSearchedCategoryPostsData(params.category)
  const retrievedContent = `カテゴリー【${postCategory.categoryNamesList[params.category]}】`
  return {
    props: {
      title: "検索結果",
      description: "サイト内投稿の検索結果です。",
      searchResultData,
      retrievedContent
    }
  }
}
