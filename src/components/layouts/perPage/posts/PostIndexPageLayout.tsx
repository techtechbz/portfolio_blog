import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { htmlPostData, postData } from "@/types/postData";
import FeaturedPostsContentsPart from "@/uiParts/contents/FeaturedPostsContentsPart";
import RecentPostsContentsPart from "@/uiParts/contents/RecentPostsContentsPart";
import MainFeaturedPost from "@/uiParts/top/MainFeaturedPost";

import indexCss from "@/styles/pageCss/index.module.css";

const SideMenu = dynamic(() => import("@/uiParts/sideMenu/SideMenu"))

type Props = {
  mainFeaturedPostData: postData
  subFeaturedPostsData: ReadonlyArray<postData>
  recentPostsData: ReadonlyArray<htmlPostData>
  isMobile: boolean
}

const PostIndexPageLayout: FC<Props> = memo(({ mainFeaturedPostData, subFeaturedPostsData, recentPostsData, isMobile }: Props) => {
  return (
    <div className={indexCss.IndexContainer}>
      <div className={indexCss.MainFeaturedPost}>
        <MainFeaturedPost {...{mainFeaturedPostData}} />
      </div>
      <FeaturedPostsContentsPart
        heading="おススメの投稿"
        featuredPostsData={subFeaturedPostsData}
        isMobile={isMobile}
      />
      <hr />
      <div className={indexCss.IndexFlexBox}>
        <div className={indexCss.IndexContents}>
          <RecentPostsContentsPart
            heading="最近の投稿"
            {...{recentPostsData, isMobile}}
          />
        </div>
        {!isMobile && (
          <div className={indexCss.IndexSideMenu}>
            <SideMenu />
          </div>
        )}
      </div>
    </div>
  );
})

export default PostIndexPageLayout