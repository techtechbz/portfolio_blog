import { FC, memo } from "react"
import Image from "next/image"

import { postPageData } from "@/types/matterResultData";
import { PageIntroduceCard } from "../cardParts/PageIntroduceCard";
import { PageIntroduceCardContent } from "../cardParts/PageIntroduceCardContent";
import { SideImageCardMedia } from "../cardParts/SideImageCardMedia";
import { PostIconCardMedia } from "../cardParts/PostIconCardMedia"
import { MIN_MOBILE_WIDTH_QUERY } from "@/lib/themes/defaultTheme";

import recentCardCss from "@/styles/moduleCss/recentCard.module.css"


type Props = {
  pageData: postPageData
  isDesktop: boolean
}

const mobileCardHeight = "170px"
const desktopCardHeight = "210px"

export const RecentPostCard: FC<Props> = memo(({pageData, isDesktop}: Props) => {
  const cardHeight = isDesktop ? desktopCardHeight : mobileCardHeight
  const postImage = <Image className={recentCardCss.RecentCardImage} src={`/images/${pageData.eyecatchFile}`} alt="post image" fill sizes={`${MIN_MOBILE_WIDTH_QUERY} 136px, 55px`} />
  return (
    <PageIntroduceCard mobileCardHeight={mobileCardHeight} desktopCardHeight={desktopCardHeight} href={`/posts/${pageData.id}`}>
      <div className={recentCardCss.RecentCardFlexBox}>
        {isDesktop && (
          <div className={recentCardCss.RecentCardSideImage}>
            <SideImageCardMedia height={desktopCardHeight}>
              {postImage}
            </SideImageCardMedia>
          </div>
        )}
        <div className={recentCardCss.RecentCardPostData}>
          <PageIntroduceCardContent height={cardHeight}>
            <div className={recentCardCss.RecentCardTitleRow}>
              {!isDesktop && (
                <div className={recentCardCss.RecentCardIconImage}>
                  <PostIconCardMedia diameter="6vw">
                    {postImage}
                  </PostIconCardMedia>
                </div>
              )}
              <h3 className={recentCardCss.RecentCardTitle}>
                {pageData.title}
              </h3>
            </div>
            <hr />
            <div className={recentCardCss.RecentCardContentsContainer}>
              {<div className={recentCardCss.RecentCardContents} dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />}
            </div>
          </PageIntroduceCardContent>
        </div>
      </div>
    </PageIntroduceCard>
  );
})
