import { GetStaticProps } from "next"

import { MAIN_FEATURED_POST_ID, SUB_FEATURED_POSTS_IDS } from "@/constants/featuredPostsIds"
import { htmlPostData, postData } from "@/types/postData";
import PostIndexPageLayout from "@/layouts/perPage/posts/PostIndexPageLayout"
import { getRecentPostsData } from "@/lib/posts/fetchCardData/getRecentPostsData";
import { getRecentMdFilePaths } from "@/lib/posts/globFileData/getRecentMdFilePath";
import { getFeaturedPostsData } from "@/lib/posts/fetchCardData/getFeaturedPostsData";


type Props = {
  mainFeaturedPostData: postData
  subFeaturedPostsData: ReadonlyArray<postData>
  recentPostsData: ReadonlyArray<htmlPostData>
  isDesktop: boolean
}

export default function BlogIndexPage({ mainFeaturedPostData, subFeaturedPostsData, recentPostsData, isDesktop }: Props) {
  return(
    <PostIndexPageLayout {...{mainFeaturedPostData, subFeaturedPostsData, recentPostsData, isDesktop}} />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const mainFeaturedPostData = await getFeaturedPostsData(MAIN_FEATURED_POST_ID)
  const subFeaturedPostsData = await getFeaturedPostsData(SUB_FEATURED_POSTS_IDS)
  const recentPostsData = await getRecentPostsData(await getRecentMdFilePaths())
  return {
    props: {
      title: "投稿一覧",
      description: "私のポートフォリオサイトに投稿した記事のインデックスページです。",
      mainFeaturedPostData: mainFeaturedPostData[0],
      subFeaturedPostsData,
      recentPostsData
    }
  }
}
