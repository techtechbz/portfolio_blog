import { GetStaticProps } from "next"

import { SUB_FEATURED_POSTS_IDS } from "@/constants/featuredPostsIds"
import { SITE_DECSRIPTION, SITE_NAME } from "@/constants/siteOverviews";
import { htmlPostData, postData } from "@/types/postData";
import HomeLayout from "@/layouts/perPage/HomeLayout"
import { getFeaturedPostsData } from "@/lib/posts/fetchCardData/getFeaturedPostsData";
import { getRecentPostsData } from "@/lib/posts/fetchCardData/getRecentPostsData";
import { getRecentMdFilePaths } from "@/lib/posts/globFileData/getRecentMdFilePath";


type Props = {
  featuredPostsData: ReadonlyArray<postData>
  recentPostsData: ReadonlyArray<htmlPostData>
  isMobile: boolean
}

export default function HomePage({ featuredPostsData, recentPostsData, isMobile }: Props) {
  return(
    <HomeLayout {...{featuredPostsData, recentPostsData, isMobile}}/>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredPostsData = await getFeaturedPostsData(SUB_FEATURED_POSTS_IDS)
  const recentPostsData = await getRecentPostsData(await getRecentMdFilePaths())
  return {
    props: {
      title: SITE_NAME,
      description: SITE_DECSRIPTION,
      featuredPostsData,
      recentPostsData
    }
  }
}
