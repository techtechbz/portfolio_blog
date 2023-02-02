import { FC, memo } from "react";

import ProfileIcon from "./ProfileIcon";
import SocialNetworksMenu from "./SocialNetworksMenu";

import sideMenuCss from "@/styles/moduleCss/sideMenu.module.css"


const AuthorIntroduction: FC = memo(() => {
  return(
    <div className={sideMenuCss.IntroductionBackground}>
      <p className={sideMenuCss.SideMenuTitle}>運営者紹介</p>
      <div className={sideMenuCss.AuthorIcon}>
        <ProfileIcon />
      </div>
      <SocialNetworksMenu />
      <p className={sideMenuCss.IntroductionDetail}>
        {`Web開発と経済学について勉強しています。\n好物はチキン南蛮です。`}
      </p>
    </div>
  )
})

export default AuthorIntroduction