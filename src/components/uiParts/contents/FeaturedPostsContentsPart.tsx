import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { featuredPostsCardData } from "@/types/cardData";

import cardCss from "@/styles/moduleCss/featuredCard.module.css"

const FeaturedPageCard = dynamic(() => import("../card/FeaturedPageCard"))

type Props = {
  heading: string
  featuredPostsCardData: featuredPostsCardData
  isDesktop: boolean
}

const FeaturedPostsContentsPart: FC<Props> = memo(({ heading, featuredPostsCardData, isDesktop }: Props) => {
  return (
    <div className="PostsLineUpPart">
      <h2 className="PostsLineUpHeading">{heading}</h2>
      {featuredPostsCardData.length >= 1 && (
        <div className="CardContainer">
          <div className={cardCss.FlexCardContainer}>
            {featuredPostsCardData.map((pageData) => (
              <div className={cardCss.IndexPagesFeaturedCard} key={pageData.id}>
                <FeaturedPageCard {...{pageData, isDesktop}} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
})

export default FeaturedPostsContentsPart