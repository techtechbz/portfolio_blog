import { FC, memo, ReactNode } from "react"

import BackToHomeLink from "@/components/uiElements/link/BackToHomeLink"

import fixedPageCss from "@/common/styles/pageCss/fixedPage.module.css"

type Props = {
  children: ReactNode
}

const ContactPageLayout: FC<Props> = memo(({ children }: Props) => {
  return (
    <div className={fixedPageCss.StaticPageContainer}>
      <h1 className={fixedPageCss.PageTitle}>お問い合わせ</h1>
      {children}
      <div className={fixedPageCss.ContactPagesBackHomeLink}>
        <BackToHomeLink />
      </div>
    </div>
  )
})
        
export default ContactPageLayout