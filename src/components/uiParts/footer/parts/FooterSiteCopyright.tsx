import { FC, memo } from "react"

import { SITE_NAME, SITE_PUBLISH_YEAR } from "@/constants/siteOverviews";
import BlackTextLink from "@/uiElements/link/BlackTextLink";

import footerCss from "@/styles/moduleCss/footer.module.css";


const FooterSiteCopyright: FC = memo(() => {
  return (
    <div className={footerCss.FooterCopyRight}>
      <div className={footerCss.FooterCopyRightYear}>
        {`©  ${SITE_PUBLISH_YEAR}  `}
      </div>
      <BlackTextLink href="/">
        {SITE_NAME}
      </BlackTextLink>
    </div>
  );
})

export default FooterSiteCopyright