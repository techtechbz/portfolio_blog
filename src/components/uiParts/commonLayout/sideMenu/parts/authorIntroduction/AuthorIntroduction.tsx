import { FC, memo } from "react";

import { ProfileIcon } from "./ProfileIcon";
import { SocialNetworksMenu } from "./SocialNetworksMenu";

import sideMenuCss from "@/styles/moduleCss/sideMenu.module.css"


export const AuthorIntroduction: FC = memo(() => {
  return(
    <div className={sideMenuCss.IntroductionBackground}>
      <p className={sideMenuCss.SideMenuTitle}>運営者紹介</p>
      <div className={sideMenuCss.AuthorIcon}>
        <ProfileIcon />
      </div>
      <SocialNetworksMenu />
      <div className={sideMenuCss.IntroductionDetail}>
        {`フリーランスのWebコンテンツ制作者です。\nWebサイト制作・SEOライティング業務を承っております。`}
      </div>
    </div>
  )
})
