import { FC, memo } from "react";

import { AuthorIntroduction } from "./parts/authorIntroduction/AuthorIntroduction"
import { SearchCategoryMenu } from "./parts/searchCategoryMenu";
import { SearchArchivesMenu } from "./parts/searchArchivesMenu";

import sideMenuCss from "@/styles/moduleCss/sideMenu.module.css"


type Props = {
  isHome?: boolean
}

export const SideMenu: FC<Props> = memo(({ isHome }: Props) => {
  return (
    <div className={sideMenuCss.SideMenu}>
      {isHome && (
        <div className={sideMenuCss.SideMenuContents}>
          <AuthorIntroduction />
        </div>
      )}
      <div className={sideMenuCss.SideMenuLinksList}>
        <SearchCategoryMenu />
        <SearchArchivesMenu />
      </div>
    </div>
  )
})
