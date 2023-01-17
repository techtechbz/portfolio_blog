import { BLOG_CATEGORIES_LIST } from "@/constants/blogCategories"
import { searchResult } from "@/types/searchResult"
import { getRecentPostsData } from "../fetchCardData/getRecentPostsData"


const getSearchedCategoryFilePaths = async (category: string): Promise<ReadonlyArray<string>> => {
  const glob = require("glob")
  return glob.sync(`postsMd/${category}/*.md`, {absolute: true, nodir: true})
}

export const getSearchedCagetoryPostsData = async (categoryTag: string): Promise<searchResult> => {
  if (categoryTag in BLOG_CATEGORIES_LIST) {
    const foundPostsPaths = await getSearchedCategoryFilePaths(categoryTag)
    const foundPostsData = await getRecentPostsData(foundPostsPaths)
    if (foundPostsData.length >= 1) return {foundPostsData: foundPostsData, resultMessage: `カテゴリー : ${BLOG_CATEGORIES_LIST[categoryTag].text}`};
  }
  return {foundPostsData: [], resultMessage: "お探しのカテゴリーに関する記事は見つかりませんでした。"}
}
