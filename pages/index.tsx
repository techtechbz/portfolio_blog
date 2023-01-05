import { GetStaticProps } from "next"

import { SUB_FEATURED_POSTS_IDS } from "src/common/constants/featuredPostsIds"
import { SITE_DECSRIPTION, SITE_NAME } from "src/common/constants/siteOverviews";
import { htmlPostData, postData } from "src/common/types/postData";
import HomeLayout from "src/components/layouts/perPage/HomeLayout"
import { getFeaturedPostsData } from "src/lib/posts/fetchCardData/getFeaturedPostsData";
import { getRecentPostsData } from "src/lib/posts/fetchCardData/getRecentPostsData";
import { getRecentMdFilePaths } from "src/lib/posts/globFileData/getRecentMdFilePath";


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
