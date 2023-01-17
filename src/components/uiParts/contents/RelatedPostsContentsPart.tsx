import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { postData } from "@/types/postData"

import cardCss from "@/styles/moduleCss/featuredCard.module.css"

const FeaturedPageCard = dynamic(() => import("../card/FeaturedPageCard"))

type Props = {
  relatedPostsData: ReadonlyArray<postData>
}

const RelatedPostsContentsPart: FC<Props> = memo(({ relatedPostsData }: Props) => {
  return (
    <>
      {relatedPostsData.length >= 1 && (
        <div className="PostsLineUpPart">
          <h2 className="PostsLineUpHeading">関連記事</h2>
          <div className="CardContainer">
            <div className={cardCss.FeaturedCardContainer}>
              {relatedPostsData.map((pageData) => (
                <div className={cardCss.PostPagesFeaturedCard} key={pageData.id}>
                  <FeaturedPageCard {...{pageData}} />
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