import { GetStaticProps } from "next"

import { blogIndexPageCardData } from "@/types/cardData";
import PostIndexPageLayout from "@/layouts/perPage/posts/PostIndexPageLayout"
import { fetchingBlogIndexPageCardData } from "@/lib/posts/fetchers/pageDataFetcher/fetchingBlogIndexPageData";


type Props = blogIndexPageCardData & {
  isDesktop: boolean
}

export default function BlogIndexPage({ mainFeaturedPostCardData, subFeaturedPostsCardData, recentPostsCardData, isDesktop }: Props) {
  return(
    <PostIndexPageLayout {...{mainFeaturedPostCardData, subFeaturedPostsCardData, recentPostsCardData, isDesktop}} />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const blogIndexPageCardData = await fetchingBlogIndexPageCardData()
  return {
    props: {
      title: "投稿一覧",
      description: "私のポートフォリオサイトに投稿した記事のインデックスページです。",
      ...blogIndexPageCardData
    }
  }
}
