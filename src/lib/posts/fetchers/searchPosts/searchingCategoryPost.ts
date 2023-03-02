import { globSync } from 'glob'

import { SearchedPostsCardData } from "../cardDataFetcher/searchedPostsCardData";
import { MdFilePath } from "../../valueObjects/mdFilePath"
import { MdFilePathsFetcher } from '../filePathFetcher/mdFilePathsFetcher';
import { PostMatterResultData } from '../../valueObjects/matterResultData/postMatterResultData';


class SearchedCategoryPostPathsFetcher extends MdFilePathsFetcher {
  readonly searchedCategoryPostPaths = (category: string): ReadonlyArray<MdFilePath> => {
    const searchedCategoryPostPattern = this.globMdFilePathPattern.specificCategoryPostsPathPattern(category)
    const searchedPathsList = globSync(searchedCategoryPostPattern, {absolute: true, nodir: true})
    return this.mdFilePathClassList(searchedPathsList)
  }
}

class SearchedCategoryPostsFetcher {
  private searchedCategory: string

  constructor(category: string) {
    this.searchedCategory = category
  }

  private get searchedMatterResultDataList(): ReadonlyArray<PostMatterResultData> {
    const searchedCategoryPostPaths = new SearchedCategoryPostPathsFetcher().searchedCategoryPostPaths(this.searchedCategory)
    return searchedCategoryPostPaths.map(searchedMdFilePaths => new PostMatterResultData(searchedMdFilePaths))
  }

  readonly getSearchedCagetoryPostData = async () => {
    const foundPathsNumber = this.searchedMatterResultDataList.length
    if (foundPathsNumber === 0) return {foundPostsData: [], resultMessage: "お探しのカテゴリーに関する記事は見つかりませんでした。"};
    const searchedPostsCardData = new SearchedPostsCardData(this.searchedMatterResultDataList)
    return {foundPostsData: await searchedPostsCardData.fetchCardData(), resultMessage: `${foundPathsNumber}件見つかりました。`}
  }
}

const fetchingSearchedCategoryPostsData = async (category: string) => {
  const fetcher = new SearchedCategoryPostsFetcher(category)
  return await fetcher.getSearchedCagetoryPostData()
}

export default fetchingSearchedCategoryPostsData