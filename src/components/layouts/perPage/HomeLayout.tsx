import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { featuredPostsCardData, recentPostsCardData } from "@/types/cardData";
import FeaturedPostsContentsPart from "@/uiParts/contents/FeaturedPostsContentsPart";
import RecentPostsContentsPart from "@/uiParts/contents/RecentPostsContentsPart";
import HomeMainTopWindow from "@/uiParts/top/HomeMainTopWindow";

import indexCss from "@/styles/pageCss/index.module.css";


const SideMenu = dynamic(() => import("@/uiParts/sideMenu/SideMenu"))

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
        <FeaturedPostsContentsPart
          heading="オススメの投稿"
          {...{featuredPostsCardData, isDesktop}}
        />
        <hr />
        <div className={indexCss.IndexFlexBox}>
          <div className={indexCss.IndexContents}>
            <RecentPostsContentsPart
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