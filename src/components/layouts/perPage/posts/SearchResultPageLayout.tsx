import { FC, memo } from "react"

import { searchResult } from "@/types/searchResult";
import { DisplaySearchResultPart } from "@/components/uiParts/pageContents/search/DisplaySearchResultPart";
import { SideMenu } from "@/uiParts/commonLayout/sideMenu/SideMenu";

import searchCss from "@/styles/pageCss/search.module.css"


type Props = {
  searchResultData: searchResult
  retrievedContent: string
  isDesktop: boolean
}

const SearchResultPageLayout: FC<Props> = memo(({ searchResultData, retrievedContent, isDesktop }: Props) => {
  return (
    <div className={searchCss.SearchPage}>
      <div className={searchCss.SearchPageFlexBox}>
        <div className={searchCss.SearchPageContents}>
          <DisplaySearchResultPart {...{searchResultData, retrievedContent, isDesktop}} />
        </div>
        {isDesktop && (
          <div className={searchCss.SearchPageSideMenu}>
            <SideMenu />
          </div>
        )}
      </div>
    </div>
  );
})

export default SearchResultPageLayout