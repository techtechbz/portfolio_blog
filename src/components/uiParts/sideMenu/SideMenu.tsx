import { FC, memo } from "react";
import dynamic from "next/dynamic"

import { getMenuMappingComponents } from "src/components/functional/getMenuMappingComponents";
import TextLinkWithIcon from "./parts/TextLinkWithIcon";
import ArchivesLinks from "./parts/ArchivesLinks";

import sideMenuCss from "src/common/styles/moduleCss/sideMenu.module.css"


const AuthorIntroduction = dynamic(() => import("./parts/AuthorIntroduction"))

type Props = {
  isHome?: boolean
}

const SideMenu: FC<Props> = memo(({ isHome }: Props) => {
  return (
    <div className={sideMenuCss.SideMenu}>
      {isHome && (
        <div className={sideMenuCss.SideMenuContents}>
          <AuthorIntroduction />
        </div>
      )}
      <div className={sideMenuCss.SideMenuLinksList}>
        <div className={sideMenuCss.SideMenuContents}>
          <p className={sideMenuCss.SideMenuTitle}>
            カテゴリー
          </p>
          {getMenuMappingComponents("category", TextLinkWithIcon)}
        </div>
        <div className={sideMenuCss.SideMenuContents}>
          <p className={sideMenuCss.SideMenuTitle}>
            アーカイブ
          </p>
          {getMenuMappingComponents("archives", ArchivesLinks)}
        </div>
      </div>
    </div>
  )
})

export default SideMenu