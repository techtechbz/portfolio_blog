import { GetStaticProps } from "next"

import { SITE_DECSRIPTION, SITE_NAME } from "@/constants/siteOverviews";
import { featuredPostsCardData, recentPostsCardData } from "@/types/cardData";
import HomeLayout from "@/layouts/perPage/HomeLayout"
import { fetchingHomePageCardData } from "@/lib/posts/pageData/fetchingIndexPageData";


type Props = {
  featuredPostsCardData: featuredPostsCardData
  recentPostsCardData: recentPostsCardData
  isDesktop: boolean
}

export default function HomePage({ featuredPostsCardData, recentPostsCardData, isDesktop }: Props) {
  return(
    <HomeLayout {...{featuredPostsCardData, recentPostsCardData, isDesktop}}/>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const homePostsCardData = await fetchingHomePageCardData()
  return {
    props: {
      title: SITE_NAME,
      description: SITE_DECSRIPTION,
      ...homePostsCardData
    }
  }
}
