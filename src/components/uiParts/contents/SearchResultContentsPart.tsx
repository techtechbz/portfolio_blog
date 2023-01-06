import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { searchResult } from "src/common/types/searchResult";


const SearchErrorResult = dynamic(() => import("./parts/SearchErrorResult"))
const RecentPostCardsContainer = dynamic(() => import("../container/RecentPostCardsContainer"))

type Props = {
  searchResultData: searchResult
  isMobile: boolean
}

const SearchResultContentsPart: FC<Props> = memo(({ searchResultData, isMobile }: Props) => {
  return (
    <>
      {searchResultData.foundPostsData.length === 0 ? (
        <SearchErrorResult resultMessage={searchResultData.resultMessage} {...{isMobile}} />
      ) : (
        <div className="PostsLineUpPart">
          <h2 className="PostsLineUpHeading">{`検索結果『${searchResultData.resultMessage}』`}</h2>
          <RecentPostCardsContainer
            recentPostsData={searchResultData.foundPostsData}
            {...{isMobile}}
          />
        </div>
      )}
    </>
  );
})

export default SearchResultContentsPart