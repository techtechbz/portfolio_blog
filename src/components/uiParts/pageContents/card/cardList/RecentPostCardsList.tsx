import { memo, FC } from "react"

import { recentPostsCardData } from "@/types/cardData";
import RecentPostCard from "../cardElement/RecentPostCard"

import cardCss from "@/styles/moduleCss/recentCard.module.css"

type Props = {
  recentPostsCardData: recentPostsCardData
  isDesktop: boolean
}

const RecentPostCardsList: FC<Props> = memo(({ recentPostsCardData, isDesktop }: Props) => {
  return (
    <div className="CardContainer">
      {recentPostsCardData.map((pageData) => (
        <div className={cardCss.RecentCardContainer} key={pageData.id}>
          <RecentPostCard {...{pageData, isDesktop}} />
        </div>
      ))}
    </div>
)})

export default RecentPostCardsList