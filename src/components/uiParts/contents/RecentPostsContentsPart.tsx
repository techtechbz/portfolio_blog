import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { recentPostsCardData } from "@/types/cardData"


const RecentPostCardsContainer = dynamic(() => import("../container/RecentPostCardsContainer"))

type Props = {
  heading: string
  recentPostsCardData: recentPostsCardData
  isDesktop: boolean
}

const RecentPostsContentsPart: FC<Props> = memo(({ heading, recentPostsCardData, isDesktop }: Props) => {
  return (
    <div className="PostsLineUpPart">
      <h2 className="PostsLineUpHeading">{heading}</h2>
      {recentPostsCardData.length >= 1 ? (
        <RecentPostCardsContainer {...{recentPostsCardData, isDesktop}} />
      ) : (
        <div>最近の投稿はありません。</div>
      )}
    </div>
  );
})

export default RecentPostsContentsPart