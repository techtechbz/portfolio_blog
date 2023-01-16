import { GetStaticProps } from "next"

import { htmlPostData } from "@/common/types/postData"
import SiteIntroductionPageLayout from "@/components/layouts/perPage/SiteIntroductionPageLayout"
import { getHtmlPageData } from "@/lib/posts/translateToHtml/getHtmlPageData"

import fixedPageStyles from "@/common/styles/pageCss/fixedPage.module.css"


type Props = {
  siteIntroductionPageData: htmlPostData
}

export default function SiteIntroduction({ siteIntroductionPageData }: Props) {
  return(
    <SiteIntroductionPageLayout>
      <div className={fixedPageStyles.PageContents} dangerouslySetInnerHTML={{ __html: siteIntroductionPageData.contentHtml }} />
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
