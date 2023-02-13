import { FC, memo } from "react"

import { featuredPostsCardData, recentPostsCardData } from "@/types/cardData";
import { FeaturedPagesLineUpPart } from "@/components/uiParts/pageContents/index/FeaturedPagesLineUpPart";
import { RecentPostsLineUpPart } from "@/components/uiParts/pageContents/index/RecentPostsLineUpPart";
import { HomeMainTopWindow } from "@/uiParts/commonLayout/top/HomeMainTopWindow";
import { SideMenu } from "@/components/uiParts/commonLayout/sideMenu/SideMenu"

import indexCss from "@/styles/pageCss/index.module.css";


type Props = {
  featuredPostsCardData: featuredPostsCardData
  recentPostsCardData: recentPostsCardData
  isDesktop: boolean
}

const HomeLayout: FC<Props> = memo(({ featuredPostsCardData, recentPostsCardData, isDesktop }: Props) => {
  return (
    <>
      <HomeMainTopWindow />
      <div className={indexCss.IndexContainer}>
        <FeaturedPagesLineUpPart
          heading="オススメの投稿"
          {...{featuredPostsCardData, isDesktop}}
        />
        <hr />
        <div className={indexCss.IndexFlexBox}>
          <div className={indexCss.IndexContents}>
            <RecentPostsLineUpPart
              heading="新着記事"
              {...{recentPostsCardData, isDesktop}}
            />
          </div>
          {isDesktop && (
            <div className={indexCss.IndexSideMenu}>
              <SideMenu isHome />
            </div>
          )}
         </div>
      </div>
    </>
  );
})

export default HomeLayout