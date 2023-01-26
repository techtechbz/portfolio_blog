import { memo, FC } from "react"

import { htmlPostData } from "@/types/postData";
import RecentPostCard from "../card/RecentPostCard"

import cardCss from "@/styles/moduleCss/recentCard.module.css"

type Props = {
  isDesktop: boolean
  recentPostsData: ReadonlyArray<htmlPostData>
}

const RecentPostCardsContainer: FC<Props> = memo(({ isDesktop, recentPostsData }: Props) => {
  return (
    <div className="CardContainer">
      {recentPostsData.map((pageData) => (
        <div className={cardCss.RecentCardContainer} key={pageData.id}>
          <RecentPostCard {...{pageData, isDesktop}} />
        </div>
      ))}
    </div>
)})

export default RecentPostCardsContainer