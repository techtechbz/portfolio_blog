import { postMatterResultOverviews, postPageData } from "./matterResultData";

export type featuredPostsCardData = ReadonlyArray<postMatterResultOverviews>
export type recentPostsCardData = ReadonlyArray<postPageData>

export interface blogIndexPageCardData {
  mainFeaturedPostCardData: postMatterResultOverviews
  subFeaturedPostsCardData: featuredPostsCardData
  recentPostsCardData: recentPostsCardData
}