import {unified} from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"

import { PageContent } from "./pageContent"


export class RecentPostCardContent {
  private readonly postContent: PageContent

  constructor(content: string) {
    const shortenContent = this.omitContents(content)
    const omitLinksContent = this.omitLinks(shortenContent)
    this.postContent = new PageContent("planeMd", omitLinksContent)
  }

  private readonly omitLinks = (contents: string): string => contents.replaceAll(/\[([[:^cntrl:]]+)\]\([-_.!~*';/?:@&=+$,%#a-zA-Z0-9]+\)/g, "$1")

  private readonly omitContents = (contents: string): string => {
    const maxCharacterIndex = contents.indexOf("\n", 150)
    const omitContents = maxCharacterIndex === -1 ? contents : contents.substring(0, maxCharacterIndex)
    return omitContents
  }

  private readonly convertContentToHtml = async (): Promise<string> => {
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(this.postContent.plainMdContent)
     return processedContent.toString()
  }

  readonly fetchHtmlCardContent = async () => {
    const htmlContent = await this.convertContentToHtml()
    return new PageContent("html", htmlContent)
  }
}