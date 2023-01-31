import { FC, memo } from "react"
import Image from "next/image"

import { postMatterResultOverviews } from "@/types/matterResultData";
import DefaultPageIntroduceCard from "./parts/DefaultPageIntroduceCard";
import DefaultCardContent from "./parts/DefaultCardContent";
import SideImageCardMedia from "./parts/SideImageCardMedia";
import { MIN_MOBILE_WIDTH_QUERY } from "@/lib/themes/defaultTheme";

import cardCss from "@/styles/moduleCss/featuredCard.module.css"


type Props = {
  pageData: postMatterResultOverviews
  isDesktop: boolean
}

const mobileCardHeight = "160px"
const desktopCardHeight = "200px"

const FeaturedPageCard: FC<Props> = memo(({ pageData, isDesktop }: Props) => {
  const cardHeight = isDesktop ? desktopCardHeight : mobileCardHeight
  return (
    <DefaultPageIntroduceCard mobileCardHeight={mobileCardHeight} desktopCardHeight={desktopCardHeight} href={`/posts/${pageData.id}`}>
      <div className={cardCss.FeaturedCardFlexBox}>
        <div className={cardCss.FeaturedCardImage}>
          <SideImageCardMedia height={cardHeight}>
            <Image src={`/images/${pageData.eyecatchFile}`} alt="post image" fill sizes={`${MIN_MOBILE_WIDTH_QUERY} 136px, 200px`}/>
          </SideImageCardMedia>
        </div>
        <div className={cardCss.FeaturedCardContents}>
          <DefaultCardContent height={cardHeight}>
            <h3 className={cardCss.FeaturedCardTitle}>
              {pageData.title}
            </h3>
            <hr />
            <p className={cardCss.FeaturedCardDescription}>
              {pageData.description}
            </p>
            <p className={cardCss.FeaturedCardDate}>
              {pageData.date}
            </p>
          </DefaultCardContent>
        </div>
      </div>
    </DefaultPageIntroduceCard>
  );
})

export default FeaturedPageCard