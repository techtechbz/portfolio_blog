import { FC, memo, ReactNode } from "react"

import BackToHomeLink from "@/uiElements/link/BackToHomeLink"
import DocumentDate from "@/uiElements/text/DocumentDate"

import fixedPageCss from "@/styles/pageCss/fixedPage.module.css"


type Props = {
  createDate: string
  updateDate?: string
  children: ReactNode
}

const PrivacyPolicyPageLayout: FC<Props> = memo(({ createDate, updateDate, children }: Props) => {
  return (
    <div className={fixedPageCss.StaticPageContainer}>
      <h1 className={fixedPageCss.PageTitle}>プライバシーポリシー</h1>
      <div className={fixedPageCss.DocumentDate}>
        <DocumentDate createDateString={createDate} updateDateString={updateDate} />
      </div>
      {children}
      <BackToHomeLink />
    </div>
  )
})
        
export default PrivacyPolicyPageLayout