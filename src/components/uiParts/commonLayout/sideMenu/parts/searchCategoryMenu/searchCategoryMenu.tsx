import { FC, memo } from "react";

import { getMenuMappingComponents } from "@/components/functional/getMenuMappingComponents";
import CategoryLink from "./categoryLink";

import sideMenuCss from "@/styles/moduleCss/sideMenu.module.css"


const SearchCategoryMenu: FC = memo(() => {
  return(
    <div className={sideMenuCss.SideMenuContents}>
      <p className={sideMenuCss.SideMenuTitle}>
        カテゴリー
      </p>
      {getMenuMappingComponents("category", CategoryLink)}
    </div>
  )
})

export default SearchCategoryMenu