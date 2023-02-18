import { FC, memo } from "react"

import { postMatterResultOverviews } from "@/types/matterResultData";
import { featuredPostsCardData, recentPostsCardData } from "@/types/cardData";
import { FeaturedPagesLineUpPart } from "@/components/uiParts/pageContents/blogIndex/FeaturedPagesLineUpPart";
import { RecentPostsLineUpPart } from "@/components/uiParts/pageContents/blogIndex/RecentPostsLineUpPart";
import { MainFeaturedPostCard } from "@/components/uiParts/commonLayout/top/MainFeaturedPostCard";
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
    <div className={postIndexCss.IndexContainer}>
      <div className={postIndexCss.MainFeaturedPost}>
        <MainFeaturedPostCard {...{mainFeaturedPostCardData}} />
      </div>
      <FeaturedPagesLineUpPart
        heading="おススメの投稿"
        featuredPostsCardData={subFeaturedPostsCardData}
        isDesktop={isDesktop}
      />
      <div className={postIndexCss.IndexFlexBox}>
        <div className={postIndexCss.IndexContents}>
          <RecentPostsLineUpPart
            heading="最近の投稿"
            {...{recentPostsCardData, isDesktop}}
          />
        </div>
        {isDesktop && (
          <div className={postIndexCss.IndexSideMenu}>
            <SideMenu />
          </div>
        )}
      </div>
    </div>
  );
})

export default PostIndexPageLayout