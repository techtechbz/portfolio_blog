import { FC, memo } from "react"

import { getMenuMappingComponents } from "@/components/functional/getMenuMappingComponents";
import ResponsiveDivider from "./parts/ResponsiveDivider";
import FooterSiteCopyright from "./parts/FooterSiteCopyright";
import FooterLink from "./parts/FooterLink";

import footerCss from "@/styles/moduleCss/footer.module.css";


type Props = {
  isDesktop: boolean
}

const Footer: FC<Props> = memo(({ isDesktop }: Props) => {
  return (
    <div className={footerCss.FooterBackground}>
      <div className={footerCss.FooterContainer}>
        <div className={footerCss.FooterMenuRow}>
          <div className={footerCss.FooterMenuContainer}>
            <p className={footerCss.FooterMenuTitle}>メインメニュー</p>
            <div className={footerCss.FooterLinks}>
              {getMenuMappingComponents("footer", FooterLink)}
            </div>
          </div>
          <ResponsiveDivider {...{isDesktop}} />
        </div>
        <div className={footerCss.FooterMenuRow}>
          <div className={footerCss.FooterMenuContainer}>
            <p className={footerCss.FooterMenuTitle}>ブログ</p>
            <p className={footerCss.FooterMenuSubTitle}>● カテゴリー</p>
            <div className={footerCss.FooterLinks}>
              {getMenuMappingComponents("category", FooterLink)}
            </div>
            <p className={footerCss.FooterMenuSubTitle}>● アーカイブ</p>
            <div className={footerCss.FooterLinks}>
              {getMenuMappingComponents("archives", FooterLink)}
            </div>
          </div>
        </div>
      </div>
      <FooterSiteCopyright />
    </div>
  );
})

export default Footer