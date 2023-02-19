import { FC, memo } from "react"

import { getMenuMappingComponents } from "@/functional/getMenuMappingComponents";
import { FooterSiteCopyright } from "./parts/FooterSiteCopyright";
import { FooterLink } from "./parts/FooterLink";

import footerCss from "@/styles/moduleCss/footer.module.css";


export const Footer: FC = memo(() => {
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
