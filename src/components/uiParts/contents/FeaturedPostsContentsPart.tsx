import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { postData } from "@/types/postData"

import cardCss from "@/styles/moduleCss/featuredCard.module.css"

const FeaturedPageCard = dynamic(() => import("../card/FeaturedPageCard"))

type Props = {
  heading: string
  featuredPostsData: ReadonlyArray<postData>
  isDesktop: boolean
}

const FeaturedPostsContentsPart: FC<Props> = memo(({ heading, featuredPostsData, isDesktop }: Props) => {
  return (
    <div className="PostsLineUpPart">
      <h2 className="PostsLineUpHeading">{heading}</h2>
      {featuredPostsData.length >= 1 && (
        <div className="CardContainer">
          <div className={cardCss.FlexCardContainer}>
            {featuredPostsData.map((pageData) => (
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