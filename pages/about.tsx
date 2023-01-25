import { GetStaticProps } from "next"

import { htmlPostData } from "@/types/postData"
import SiteIntroductionPageLayout from "@/layouts/perPage/SiteIntroductionPageLayout"
import { getHtmlPageData } from "@/lib/posts/translateToHtml/getHtmlPageData"

import staticPageStyles from "@/styles/pageCss/staticPage.module.css"


type Props = {
  siteIntroductionPageData: htmlPostData
}

export default function SiteIntroduction({ siteIntroductionPageData }: Props) {
  return(
    <SiteIntroductionPageLayout>
      <div className={staticPageStyles.PageContents} dangerouslySetInnerHTML={{ __html: siteIntroductionPageData.contentHtml }} />
    </SiteIntroductionPageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const siteIntroductionPageData = await getHtmlPageData("/app/postsMd/fixed/site-introduction.md")
  return {
    props: {
      title: "サイト紹介",
      description: "サイト紹介ページです。",
      siteIntroductionPageData
    }
  }
}
