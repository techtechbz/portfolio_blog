import { FC, memo, ReactNode } from "react"

import BackToHomeLink from "src/components/uiElements/link/BackToHomeLink"
import fixedPageCss from "src/common/styles/pageCss/fixedPage.module.css"

type Props = {
  children: ReactNode
}

const SiteIntroductionPageLayout: FC<Props> = memo(({ children }: Props) => {
  return (
    <div className={fixedPageCss.StaticPageContainer}>
      <h1 className={fixedPageCss.PageTitle}>サイト紹介</h1>
        {children}
      <BackToHomeLink />
    </div>
  )
})
        
export default SiteIntroductionPageLayout