import { FC, memo } from "react"

import { searchResult } from "@/types/searchResult";
import { SearchErrorResult } from './SearchErrorResult'
import { RecentPostCardsList } from "../card/cardList/RecentPostCardsList";

import searchCss from "@/styles/pageCss/search.module.css"


type Props = {
  searchResultData: searchResult
  retrievedContent: string
  isDesktop: boolean
}

export const DisplaySearchResultPart: FC<Props> = memo(({ searchResultData, retrievedContent, isDesktop }: Props) => {
  return (
    <>
      {searchResultData.foundPostsData.length === 0 ? (
        <SearchErrorResult resultMessage={searchResultData.resultMessage} {...{isDesktop}} />
      ) : (
        <div className="PostsLineUpPart">
          <h1 className={searchCss.SearchPageTitle}>{`${retrievedContent}`}</h1>
          <h2 className="StylingSubHeading">{`検索結果 : ${searchResultData.resultMessage}`}</h2>
          <RecentPostCardsList
            recentPostsCardData={searchResultData.foundPostsData}
            {...{isDesktop}}
          />
        </div>
      )}
    </>
  );
})
