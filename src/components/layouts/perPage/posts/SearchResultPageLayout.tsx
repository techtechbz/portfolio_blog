import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { searchResult } from "src/common/types/searchResult";
import SearchResultContentsPart from "src/components/uiParts/contents/SearchResultContentsPart";

import searchCss from "src/common/styles/pageCss/search.module.css"


const SideMenu = dynamic(() => import("src/components/uiParts/sideMenu/SideMenu"))

type Props = {
  searchResultData: searchResult
  isMobile: boolean
}

const SearchResultPageLayout: FC<Props> = memo(({ searchResultData, isMobile }: Props) => {
  return (
    <div className={searchCss.SearchPage}>
      <div className={searchCss.SearchPageFlexBox}>
        <div className={searchCss.SearchPageContents}>
          <SearchResultContentsPart {...{searchResultData, isMobile}} />
        </div>
        {!isMobile && (
          <div className={searchCss.SearchPageSideMenu}>
            <SideMenu />
          </div>
        )}
      </div>
    </div>
  );
})

export default SearchResultPageLayout