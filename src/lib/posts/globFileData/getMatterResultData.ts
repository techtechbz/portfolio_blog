import fs from "fs"
import matter from "gray-matter"

import { complementMatterResult } from "../dataConverter/complementMatterResult"

export const getMatterResultData = async (fullPath: string) => {
  console.log(fs.existsSync(fullPath))
  if (!fs.existsSync(fullPath)) new Error("ファイルが存在しません。")
  
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, ...matterResult } = matter(fileContents)
  return {
    data: complementMatterResult(data),
    ...(matterResult)
  }
}
