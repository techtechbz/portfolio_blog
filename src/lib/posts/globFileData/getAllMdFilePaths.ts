import { ALL_POSTS_PATH_PATTERN } from "@/common/constants/blogCategories"

export const getAllMdFilePaths = async (): Promise<ReadonlyArray<string>> => {
  const glob = require("glob")
  return glob.sync(ALL_POSTS_PATH_PATTERN, {absolute: true, nodir: true}) as ReadonlyArray<string>
}
