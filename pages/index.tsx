import { GetStaticProps } from "next"

import { SITE_DECSRIPTION, SITE_NAME } from "@/constants/siteOverviews";
import { featuredPostsCardData } from "@/types/cardData";
import HomeLayout from "@/layouts/perPage/HomeLayout"
import { fetchingHomePageCardData } from "@/lib/posts/fetchers/pageDataFetcher/fetchingIndexPageData";


type Props = {
  featuredPostsCardData: featuredPostsCardData
  isDesktop: boolean
}

export default function HomePage({ featuredPostsCardData, isDesktop }: Props) {
  return(
    <HomeLayout {...{featuredPostsCardData, isDesktop}}/>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: SITE_NAME,
      description: SITE_DECSRIPTION,
      featuredPostsCardData: await fetchingHomePageCardData()
    }
  }
}
