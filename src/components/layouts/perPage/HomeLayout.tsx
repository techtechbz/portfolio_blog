import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { htmlPostData, postData } from "src/common/types/postData";
import FeaturedPostsContentsPart from "src/components/uiParts/contents/FeaturedPostsContentsPart";
import RecentPostsContentsPart from "src/components/uiParts/contents/RecentPostsContentsPart";
import HomeMainTopWindow from "src/components/uiParts/top/HomeMainTopWindow";

import indexCss from "src/common/styles/pageCss/index.module.css";


const SideMenu = dynamic(() => import("src/components/uiParts/sideMenu/SideMenu"))

type Props = {
  featuredPostsData: ReadonlyArray<postData>
  recentPostsData: ReadonlyArray<htmlPostData>
  isMobile: boolean
}

const HomeLayout: FC<Props> = memo(({ featuredPostsData, recentPostsData, isMobile }: Props) => {
  return (
    <>
      <HomeMainTopWindow />
      <div className={indexCss.IndexContainer}>
        <FeaturedPostsContentsPart
          heading="オススメの投稿"
          {...{featuredPostsData}}
        />
        <hr />
        <div className={indexCss.IndexFlexBox}>
          <div className={indexCss.IndexContents}>
            <RecentPostsContentsPart
              heading="新着記事"
              {...{recentPostsData, isMobile}}
            />
          </div>
          {!isMobile && (
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