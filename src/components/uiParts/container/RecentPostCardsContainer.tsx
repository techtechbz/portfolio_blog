import { memo, FC } from "react"

import { htmlPostData } from "@/common/types/postData";
import RecentPostCard from "../card/RecentPostCard"

import cardCss from "@/common/styles/moduleCss/recentCard.module.css"

type Props = {
  isMobile: boolean
  recentPostsData: ReadonlyArray<htmlPostData>
}

const RecentPostCardsContainer: FC<Props> = memo(({ isMobile, recentPostsData }: Props) => {
  return (
    <div className="CardContainer">
      {recentPostsData.map((pageData) => (
        <div className={cardCss.RecentCardContainer} key={pageData.id}>
          <RecentPostCard {...{pageData, isMobile}} />
        </div>
      ))}
    </div>
)})

export default RecentPostCardsContainer