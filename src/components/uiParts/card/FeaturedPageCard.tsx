import { FC, memo } from "react"
import Image from "next/image"

import { postData } from "src/common/types/postData"
import DefaultPageIntroduceCard from "./parts/DefaultPageIntroduceCard";
import DefaultCardContent from "./parts/DefaultCardContent";
import SideImageCardMedia from "./parts/SideImageCardMedia";
import { MIN_MOBILE_WIDTH_QUERY } from "src/lib/themes/defaultTheme";

import cardCss from "src/common/styles/moduleCss/featuredCard.module.css"


type Props = {
  pageData: postData
}

const cardHeight = "200px"

const FeaturedPageCard: FC<Props> = memo(({ pageData }: Props) => {
  return (
    <DefaultPageIntroduceCard cardHeight={cardHeight} href={`/posts/${pageData.id}`}>
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