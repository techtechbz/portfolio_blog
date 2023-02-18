import { FC, memo } from "react";

import { SearchCategoryMenu } from "./parts/searchCategoryMenu";
import { SearchArchivesMenu } from "./parts/searchArchivesMenu";

import sideMenuCss from "@/styles/moduleCss/sideMenu.module.css"


export const SideMenu: FC = memo(() => {
  return (
    <div className={sideMenuCss.SideMenu}>
      <SearchCategoryMenu />
      <SearchArchivesMenu />
    </div>
  )
})
