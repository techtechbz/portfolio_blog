import { FC, memo } from "react"

import { featuredPostsCardData } from "@/types/cardData";
import { FeaturedPageCard } from "../card/cardElement/FeaturedPageCard"

import cardCss from "@/styles/moduleCss/featuredCard.module.css"


type Props = {
  relatedPostsCardData: featuredPostsCardData
  isDesktop: boolean
}

export const RelatedPostsLinuUpPart: FC<Props> = memo(({ relatedPostsCardData, isDesktop }: Props) => {
  return (
    <>
      {relatedPostsCardData.length >= 1 && (
        <div className="PostsLineUpPart">
          <h2 className="StylingSubHeading">関連記事</h2>
          <div className="CardContainer">
            <div className={cardCss.RelatedPostsCardContainer}>
              {relatedPostsCardData.map((pageData) => (
                <div className={cardCss.PostPagesFeaturedCard} key={pageData.id}>
                  <FeaturedPageCard {...{pageData, isDesktop}} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
})
