import { FC, memo, ReactNode } from "react"

import BackToHomeLink from "@/uiElements/link/BackToHomeLink"
import DocumentDate from "@/uiElements/text/DocumentDate"

import staticPageCss from "@/styles/pageCss/staticPage.module.css"


type Props = {
  createDate: string
  updateDate?: string
  children: ReactNode
}

const PrivacyPolicyPageLayout: FC<Props> = memo(({ createDate, updateDate, children }: Props) => {
  return (
    <div className={staticPageCss.StaticPageContainer}>
      <h1 className={staticPageCss.StaticPageTitle}>プライバシーポリシー</h1>
      <div className={staticPageCss.DocumentDate}>
        <DocumentDate createDateString={createDate} updateDateString={updateDate} />
      </div>
      {children}
      <BackToHomeLink />
    </div>
  )
})
        
export default PrivacyPolicyPageLayout