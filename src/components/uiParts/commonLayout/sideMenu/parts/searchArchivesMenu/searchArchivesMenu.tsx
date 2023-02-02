import { FC, memo } from "react";

import { getMenuMappingComponents } from "@/components/functional/getMenuMappingComponents";
import ArchivesLink from "./archivesLink";

import sideMenuCss from "@/styles/moduleCss/sideMenu.module.css"


const SearchArchivesMenu: FC = memo(() => {
  return(
    <div className={sideMenuCss.SideMenuContents}>
      <p className={sideMenuCss.SideMenuTitle}>
        アーカイブ
      </p>
      {getMenuMappingComponents("archives", ArchivesLink)}
    </div>
  )
})

export default SearchArchivesMenu