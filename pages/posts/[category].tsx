import { GetStaticProps, GetStaticPaths } from "next"

import { ParsedUrlQuery } from "querystring"

import { BLOG_CATEGORIES_LIST } from "src/common/constants/blogCategories";
import { searchResult } from "src/common/types/searchResult";
import SearchResultPageLayout from "src/components/layouts/perPage/posts/SearchResultPageLayout"
import { getSearchedCagetoryPostsData } from "src/lib/posts/searchPosts/getSearchedCategoryPostsData";


interface Params extends ParsedUrlQuery {
  category: string
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
  const categoryParams = Object.keys(BLOG_CATEGORIES_LIST).map((category) => ({ params: { category } }))
  return {
    paths: categoryParams,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params
  const searchResultData = await getSearchedCagetoryPostsData(params.category)
  return {
    props: {
      title: "検索結果",
      description: "サイト内投稿の検索結果です。",
      searchResultData
    }
  }
}
