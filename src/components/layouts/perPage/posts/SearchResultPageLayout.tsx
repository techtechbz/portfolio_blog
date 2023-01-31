import { FC, memo } from "react"
import dynamic from "next/dynamic"

import { searchResult } from "@/types/searchResult";
import SearchResultContentsPart from "@/uiParts/contents/SearchResultContentsPart";

import searchCss from "@/styles/pageCss/search.module.css"


const SideMenu = dynamic(() => import("@/uiParts/sideMenu/SideMenu"))

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
          <SearchResultContentsPart {...{searchResultData, retrievedContent, isDesktop}} />
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