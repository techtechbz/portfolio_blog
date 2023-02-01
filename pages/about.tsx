import { GetStaticProps } from "next"

import SiteIntroductionPageLayout from "@/layouts/perPage/SiteIntroductionPageLayout"
import fetchingFixedPageData from "@/lib/posts/fetchers/pageDataFetcher/fetchingFixedPageData"

import staticPageStyles from "@/styles/pageCss/staticPage.module.css"


type Props = {
  contentHtml: string
}

export default function SiteIntroduction({ contentHtml }: Props) {
  return(
    <SiteIntroductionPageLayout>
      <div className={staticPageStyles.PageContents} dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </SiteIntroductionPageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const siteIntroductionPageData = await fetchingFixedPageData('fixed/site-introduction')
  return {
    props: {
      title: "サイト紹介",
      description: "サイト紹介ページです。",
      contentHtml: siteIntroductionPageData.contentHtml
    }
  }
}
