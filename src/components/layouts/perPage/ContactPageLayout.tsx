import { FC, memo, ReactNode } from "react"

import BackToHomeLink from "src/components/uiElements/link/BackToHomeLink"

import fixedPageCss from "src/common/styles/pageCss/fixedPage.module.css"

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