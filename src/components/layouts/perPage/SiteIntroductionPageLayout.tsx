import { FC, memo, ReactNode } from "react"

import BackToHomeLink from "@/uiElements/link/BackToHomeLink"
import staticPageCss from "@/styles/pageCss/staticPage.module.css"

type Props = {
  children: ReactNode
}

const SiteIntroductionPageLayout: FC<Props> = memo(({ children }: Props) => {
  return (
    <div className={staticPageCss.StaticPageContainer}>
      <h1 className={staticPageCss.StaticPageTitle}>サイト紹介</h1>
        {children}
      <BackToHomeLink />
    </div>
  )
})
        
export default SiteIntroductionPageLayout