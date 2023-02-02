import { FC, memo } from "react"


import { postMatterResultOverviews } from "@/types/matterResultData";
import { featuredPostsCardData, recentPostsCardData } from "@/types/cardData";
import FeaturedPostsContentsPart from "@/uiParts/pageContents/index/FeaturedPostsContentsPart";
import RecentPostsContentsPart from "@/uiParts/pageContents/index/RecentPostsContentsPart";
import MainFeaturedPost from "@/uiParts/commonLayout/top/MainFeaturedPost";
import SideMenu from "@/uiParts/commonLayout/sideMenu/SideMenu";

import indexCss from "@/styles/pageCss/index.module.css";


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