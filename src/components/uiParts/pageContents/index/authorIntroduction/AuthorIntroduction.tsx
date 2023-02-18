import { FC, memo } from "react";

import { ProfileIcon } from "./ProfileIcon";
import { SocialNetworksMenu } from "./SocialNetworksMenu";

import indexCss from "@/styles/pageCss/index.module.css"


export const AuthorIntroduction: FC = memo(() => {
  return(
    <>
      <h2 className="StylingSubHeading">運営者紹介</h2>
      <div className={indexCss.AuthorIntroductionContainer}>
        <div className={indexCss.AuthorIntroductionBackground}>
          <div className={indexCss.AuthorIntroductionIconsContainer}>
            <ProfileIcon />
            <SocialNetworksMenu />
          </div>
          <div className={indexCss.AuthorIntroductionDetail}>
            <p>Webコンテンツを制作しています。</p>
            <p>好物はチキン南蛮です。</p>
          </div>
        </div>
      </div>
    </>
  )
})
