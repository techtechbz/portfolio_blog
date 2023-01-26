import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { searchResult } from "@/types/searchResult";


const SearchErrorResult = dynamic(() => import("./parts/SearchErrorResult"))
const RecentPostCardsContainer = dynamic(() => import("../container/RecentPostCardsContainer"))

type Props = {
  searchResultData: searchResult
  isDesktop: boolean
}

const SearchResultContentsPart: FC<Props> = memo(({ searchResultData, isDesktop }: Props) => {
  return (
    <>
      {searchResultData.foundPostsData.length === 0 ? (
        <SearchErrorResult resultMessage={searchResultData.resultMessage} {...{isDesktop}} />
      ) : (
        <div className="PostsLineUpPart">
          <h2 className="PostsLineUpHeading">{`検索結果『${searchResultData.resultMessage}』`}</h2>
          <RecentPostCardsContainer
            recentPostsData={searchResultData.foundPostsData}
            {...{isDesktop}}
          />
        </div>
      )}
    </>
  );
})

export default SearchResultContentsPart