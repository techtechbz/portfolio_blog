import { GetStaticProps } from "next"

import { htmlPostData } from "src/common/types/postData"
import PrivacyPolicyPageLayout from "src/components/layouts/perPage/PrivacyPolicyPageLayout"
import { getHtmlPageData } from "src/lib/posts/translateToHtml/getHtmlPageData"

import fixedPageStyles from "src/common/styles/pageCss/fixedPage.module.css"


type Props = {
  privacyPolicyPageData: htmlPostData & {
    createDate: string
    updateDate: string
  }
}

export default function PrivacyPolicy({ privacyPolicyPageData }: Props) {
  const { contentHtml, ...dateData } = privacyPolicyPageData
  return(
    <PrivacyPolicyPageLayout {...dateData}>
      <div className={fixedPageStyles.PageContents} dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </PrivacyPolicyPageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const privacyPolicyPageData = await getHtmlPageData("/app/posts/fixed/privacy-policy.md")
  return {
    props: {
      title: "プライバシーポリシー",
      description: "プライバシーポリシー",
      privacyPolicyPageData
    }
  }
}
