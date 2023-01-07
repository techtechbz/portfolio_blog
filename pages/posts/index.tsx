import { GetStaticProps } from "next"

import { MAIN_FEATURED_POST_ID, SUB_FEATURED_POSTS_IDS } from "src/common/constants/featuredPostsIds"
import { htmlPostData, postData } from "src/common/types/postData";
import PostIndexPageLayout from "src/components/layouts/perPage/posts/PostIndexPageLayout"
import { getRecentPostsData } from "src/lib/posts/fetchCardData/getRecentPostsData";
import { getRecentMdFilePaths } from "src/lib/posts/globFileData/getRecentMdFilePath";
import { getFeaturedPostsData } from "src/lib/posts/fetchCardData/getFeaturedPostsData";


type Props = {
  mainFeaturedPostData: postData
  subFeaturedPostsData: ReadonlyArray<postData>
  recentPostsData: ReadonlyArray<htmlPostData>
  isMobile: boolean
}

export default function BlogIndexPage({ mainFeaturedPostData, subFeaturedPostsData, recentPostsData, isMobile }: Props) {
  return(
    <PostIndexPageLayout {...{mainFeaturedPostData, subFeaturedPostsData, recentPostsData, isMobile}} />
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
