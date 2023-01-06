import { GetStaticProps } from "next"

import { htmlPostData } from "src/common/types/postData"
import SiteIntroductionPageLayout from "src/components/layouts/perPage/SiteIntroductionPageLayout"
import { getHtmlPageData } from "src/lib/posts/translateToHtml/getHtmlPageData"

import fixedPageStyles from "src/common/styles/pageCss/fixedPage.module.css"


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
  const siteIntroductionPageData = await getHtmlPageData("/app/posts/fixed/site-introduction.md")
  return {
    props: {
      title: "サイト紹介",
      description: "サイト紹介ページです。",
      siteIntroductionPageData
    }
  }
}
