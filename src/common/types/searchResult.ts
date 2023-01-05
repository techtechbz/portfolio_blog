import { htmlPostData } from "./postData"

export type searchResult = {
  readonly foundPostsData: ReadonlyArray<htmlPostData>
  readonly resultMessage: Readonly<string>
}