import { FC, memo } from "react";
import Link from "next/link";

import { menuLinksItem } from "@/types/menuLinksList";
import { getMenuMappingComponents } from "@/functional/getMenuMappingComponents";

import sideMenuCss from "@/styles/moduleCss/sideMenu.module.css"


const ArchivesLink: FC<menuLinksItem> = memo(({text, href}: menuLinksItem) => (
  <div className={sideMenuCss.SideMenuLinks}>
    <Link href={href}>
      {`・${text}`}
    </Link>
  </div>
))

export const SearchArchivesMenu: FC = memo(() => {
  return(
    <div className={sideMenuCss.SideMenuContents}>
      <p className={sideMenuCss.SideMenuTitle}>
        アーカイブ
      </p>
      {getMenuMappingComponents("archives", ArchivesLink)}
    </div>
  )
})
