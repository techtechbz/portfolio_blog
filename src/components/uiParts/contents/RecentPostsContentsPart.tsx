import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { htmlPostData } from "@/types/postData"


const RecentPostCardsContainer = dynamic(() => import("../container/RecentPostCardsContainer"))

type Props = {
  heading: string
  recentPostsData: ReadonlyArray<htmlPostData>
  isMobile: boolean
}

const RecentPostsContentsPart: FC<Props> = memo(({ heading, recentPostsData, isMobile }: Props) => {
  return (
    <div className="PostsLineUpPart">
      <h2 className="PostsLineUpHeading">{heading}</h2>
      {recentPostsData.length >= 1 ? (
        <RecentPostCardsContainer {...{recentPostsData, isMobile}} />
      ) : (
        <div>最近の投稿はありません。</div>
      )}
    </div>
  );
})

export default RecentPostsContentsPart