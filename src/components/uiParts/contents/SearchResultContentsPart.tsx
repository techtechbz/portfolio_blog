import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { searchResult } from "@/types/searchResult";

import searchCss from "@/styles/pageCss/search.module.css"


const SearchErrorResult = dynamic(() => import("./parts/SearchErrorResult"))
const RecentPostCardsContainer = dynamic(() => import("../container/RecentPostCardsContainer"))

type Props = {
  searchResultData: searchResult
  retrievedContent: string
  isDesktop: boolean
}

const SearchResultDisplayPart: FC<Props> = memo(({ searchResultData, retrievedContent, isDesktop }: Props) => {
  return (
    <>
      {searchResultData.foundPostsData.length === 0 ? (
        <SearchErrorResult resultMessage={searchResultData.resultMessage} {...{isDesktop}} />
      ) : (
        <div className="PostsLineUpPart">
          <h1 className={searchCss.SearchPageTitle}>{`${retrievedContent}`}</h1>
          <h2 className="PostsLineUpHeading">{`検索結果 : ${searchResultData.resultMessage}`}</h2>
          <RecentPostCardsContainer
            recentPostsCardData={searchResultData.foundPostsData}
            {...{isDesktop}}
          />
        </div>
      )}
    </>
  );
})

export default SearchResultDisplayPart