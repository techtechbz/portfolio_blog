import { FC, memo } from "react"

import { postMatterResultOverviews } from "@/types/matterResultData";
import { featuredPostsCardData, recentPostsCardData } from "@/types/cardData";
import { MainFeaturedPostCard } from "@/uiParts/pageContents/blogIndex/MainFeaturedPostCard";
import { FeaturedPagesLineUpPart } from "@/uiParts/commonLayout/card/cardLineUp/FeaturedPagesLineUpPart";
import { RecentPostsLineUpPart } from "@/uiParts/pageContents/blogIndex/RecentPostsLineUpPart";
import { SideMenu } from "@/uiParts/commonLayout/sideMenu/SideMenu";

import postIndexCss from "@/styles/pageCss/postIndex.module.css";


type Props = {
  mainFeaturedPostCardData: postMatterResultOverviews
  subFeaturedPostsCardData: featuredPostsCardData
  recentPostsCardData: recentPostsCardData
  isDesktop: boolean
}

const PostIndexPageLayout: FC<Props> = memo(({ mainFeaturedPostCardData, subFeaturedPostsCardData, recentPostsCardData, isDesktop }: Props) => {
  return (
    <div className={postIndexCss.PostIndexContainer}>
      <div className={postIndexCss.MainFeaturedPost}>
        <MainFeaturedPostCard {...{mainFeaturedPostCardData}} />
      </div>
      <FeaturedPagesLineUpPart
        heading="おススメの投稿"
        featuredPostsCardData={subFeaturedPostsCardData}
        isDesktop={isDesktop}
      />
      <div className={postIndexCss.PostIndexFlexBox}>
        <div className={postIndexCss.PostIndexContents}>
          <RecentPostsLineUpPart
            heading="最近の投稿"
            {...{recentPostsCardData, isDesktop}}
          />
        </div>
        {isDesktop && (
          <div className={postIndexCss.PostIndexSideMenu}>
            <SideMenu />
          </div>
        )}
      </div>
    </div>
  );
})

export default PostIndexPageLayout