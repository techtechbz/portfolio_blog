import { GetStaticProps } from "next"

import { htmlPostData } from "@/types/postData"
import PrivacyPolicyPageLayout from "@/layouts/perPage/PrivacyPolicyPageLayout"
import { getHtmlPageData } from "@/lib/posts/translateToHtml/getHtmlPageData"

import staticPageStyles from "@/styles/pageCss/staticPage.module.css"


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
      <div className={staticPageStyles.PageContents} dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </PrivacyPolicyPageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const privacyPolicyPageData = await getHtmlPageData("/app/postsMd/fixed/privacy-policy.md")
  return {
    props: {
      title: "プライバシーポリシー",
      description: "プライバシーポリシー",
      privacyPolicyPageData
    }
  }
}
