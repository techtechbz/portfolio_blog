import { FC, memo } from "react"
import dynamic from "next/dynamic"

import FeaturedPostsContentsPart from "@/uiParts/contents/FeaturedPostsContentsPart";
import RecentPostsContentsPart from "@/uiParts/contents/RecentPostsContentsPart";
import MainFeaturedPost from "@/uiParts/top/MainFeaturedPost";
import { postMatterResultOverviews } from "@/types/matterResultData";
import { featuredPostsCardData, recentPostsCardData } from "@/types/cardData";

import indexCss from "@/styles/pageCss/index.module.css";

const SideMenu = dynamic(() => import("@/uiParts/sideMenu/SideMenu"))

type Props = {
  mainFeaturedPostCardData: postMatterResultOverviews
  subFeaturedPostsCardData: featuredPostsCardData
  recentPostsCardData: recentPostsCardData
  isDesktop: boolean
}

const PostIndexPageLayout: FC<Props> = memo(({ mainFeaturedPostCardData, subFeaturedPostsCardData, recentPostsCardData, isDesktop }: Props) => {
  return (
    <div className={indexCss.IndexContainer}>
      <div className={indexCss.MainFeaturedPost}>
        <MainFeaturedPost {...{mainFeaturedPostCardData}} />
      </div>
      <FeaturedPostsContentsPart
        heading="おススメの投稿"
        featuredPostsCardData={subFeaturedPostsCardData}
        isDesktop={isDesktop}
      />
      <hr />
      <div className={indexCss.IndexFlexBox}>
        <div className={indexCss.IndexContents}>
          <RecentPostsContentsPart
            heading="最近の投稿"
            {...{recentPostsCardData, isDesktop}}
          />
        </div>
        {isDesktop && (
          <div className={indexCss.IndexSideMenu}>
            <SideMenu />
          </div>
        )}
      </div>
    </div>
  );
})

export default PostIndexPageLayout