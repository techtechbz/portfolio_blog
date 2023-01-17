import { FC, memo } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"

import { htmlPostData } from "@/types/postData"
import DefaultPageIntroduceCard from "./parts/DefaultPageIntroduceCard";
import DefaultCardContent from "./parts/DefaultCardContent";
import { MIN_MOBILE_WIDTH_QUERY } from "@/lib/themes/defaultTheme";

import cardCss from "@/styles/moduleCss/recentCard.module.css"

type Props = {
  pageData: htmlPostData
  isMobile: boolean
}

const SideImageCardMedia = dynamic(() => import("./parts/SideImageCardMedia"))
const PostIconCardMedia = dynamic(() => import("./parts/PostIconCardMedia"))
const cardHeight = "220px"

const RecentPostCard: FC<Props> = memo(({pageData, isMobile}: Props) => {
  const postImage = <Image className={cardCss.RecentCardImage} src={`/images/${pageData.eyecatchFile}`} alt="post image" fill sizes={`${MIN_MOBILE_WIDTH_QUERY} 136px, 55px`} />
  return (
    <DefaultPageIntroduceCard cardHeight={cardHeight} href={`/posts/${pageData.id}`}>
      <div className={cardCss.RecentCardFlexBox}>
        {!isMobile && (
          <div className={cardCss.RecentCardSideImage}>
            <SideImageCardMedia height={cardHeight}>
              {postImage}
            </SideImageCardMedia>
          </div>
        )}
        <div className={cardCss.RecentCardPostData}>
          <DefaultCardContent height={cardHeight}>
            <div className={cardCss.RecentCardTitleRow}>
              {isMobile && (
                <div className={cardCss.RecentCardIconImage}>
                  <PostIconCardMedia diameter="6vw">
                    {postImage}
                  </PostIconCardMedia>
                </div>
              )}
              <h3 className={cardCss.RecentCardTitle}>
                {pageData.title}
              </h3>
            </div>
            <hr />
            <div className={cardCss.RecentCardContentsContainer}>
              {<div className={cardCss.RecentCardContents} dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />}
            </div>
          </DefaultCardContent>
        </div>
      </div>
    </DefaultPageIntroduceCard>
  );
})

export default RecentPostCard