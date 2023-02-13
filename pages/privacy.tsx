import { GetStaticProps } from "next"

import PrivacyPolicyPageLayout from "@/layouts/perPage/PrivacyPolicyPageLayout"
import fetchingFixedPageData from "@/lib/posts/fetchers/pageDataFetcher/fetchingFixedPageData"

import staticPageStyles from "@/styles/pageCss/staticPage.module.css"


type Props = {
  privacyPolicyPageData: {
    createDate: string
    updateDate?: string
    contentHtml: string
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
  const privacyPolicyPageData = await fetchingFixedPageData("fixed/privacy-policy")
  return {
    props: {
      title: "プライバシーポリシー",
      description: "プライバシーポリシー",
      privacyPolicyPageData
    }
  }
}
