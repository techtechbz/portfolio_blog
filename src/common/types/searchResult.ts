import { recentPostsCardData } from "./cardData"

export interface searchResult {
  readonly foundPostsData: recentPostsCardData
  readonly resultMessage: Readonly<string>
}