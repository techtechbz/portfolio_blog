import { FC, memo } from "react"

import { SITE_NAME, SITE_PUBLISH_YEAR } from "@/common/constants/siteOverviews";
import BlackTextLink from "@/components/uiElements/link/BlackTextLink";

import footerCss from "@/common/styles/moduleCss/footer.module.css";


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