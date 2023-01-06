import { FC, memo } from "react";

import ProfileIcon from "./introductionParts/ProfileIcon";
import SocialNetworksMenu from "./introductionParts/SocialNetworksMenu";

import sideMenuCss from "src/common/styles/moduleCss/sideMenu.module.css"


const AuthorIntroduction: FC = memo(() => {
  return(
    <div className={sideMenuCss.IntroductionBackground}>
      <p className={sideMenuCss.SideMenuTitle}>運営者紹介</p>
      <div className={sideMenuCss.AuthorIcon}>
        <ProfileIcon />
      </div>
      <SocialNetworksMenu />
      <p className={sideMenuCss.IntroductionDetail}>
        {`しがない休学中の大学生です。\n好物はチキン南蛮です。`}
      </p>
    </div>
  )
})

export default AuthorIntroduction