import { FC, memo } from "react"

import { recentPostsCardData } from "@/types/cardData"
import { RecentPostCardsList } from "@/uiParts/commonLayout/card/cardList/RecentPostCardsList"


type Props = {
  heading: string
  recentPostsCardData: recentPostsCardData
  isDesktop: boolean
}

export const RecentPostsLineUpPart: FC<Props> = memo(({ heading, recentPostsCardData, isDesktop }: Props) => {
  return (
    <div className="PostsLineUpPart">
      <h2 className="StylingSubHeading">{heading}</h2>
      {recentPostsCardData.length >= 1 ? (
        <RecentPostCardsList {...{recentPostsCardData, isDesktop}} />
      ) : (
        <div>最近の投稿はありません。</div>
      )}
    </div>
  );
})