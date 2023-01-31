import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { featuredPostsCardData } from "@/types/cardData";

import cardCss from "@/styles/moduleCss/featuredCard.module.css"

const FeaturedPageCard = dynamic(() => import("../card/FeaturedPageCard"))

type Props = {
  relatedPostsCardData: featuredPostsCardData
  isDesktop: boolean
}

const RelatedPostsContentsPart: FC<Props> = memo(({ relatedPostsCardData, isDesktop }: Props) => {
  return (
    <>
      {relatedPostsCardData.length >= 1 && (
        <div className="PostsLineUpPart">
          <h2 className="PostsLineUpHeading">関連記事</h2>
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

export default RelatedPostsContentsPart