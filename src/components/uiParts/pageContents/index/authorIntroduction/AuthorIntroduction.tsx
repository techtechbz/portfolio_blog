import { FC, memo } from "react";

import { ProfileIcon } from "./ProfileIcon";
import { SocialNetworksMenu } from "./SocialNetworksMenu";

import sideMenuCss from "@/styles/moduleCss/sideMenu.module.css"


export const AuthorIntroduction: FC = memo(() => {
  return(
    <div className={sideMenuCss.AuthorIntroductionBackground}>
      <div className={sideMenuCss.AuthorIntroductionIcons}>
        <p className={sideMenuCss.SideMenuTitle}>運営者紹介</p>
        <div className={sideMenuCss.AuthorIcon}>
          <ProfileIcon />
        </div>
        <SocialNetworksMenu />
      </div>
      <div className={sideMenuCss.AuthorIntroductionDetail}>
        <p>Webコンテンツを制作しています。</p>
        <p>好物はチキン南蛮です。</p>
      </div>
    </div>
  )
})
