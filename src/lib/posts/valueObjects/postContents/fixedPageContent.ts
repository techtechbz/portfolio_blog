import {unified} from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"

import { PostContent } from "./postContent"


export class FixedPageContent {
  private readonly postContent: PostContent

  constructor(content: string) {
    this.postContent = new PostContent("planeMd", content)
  }

  private readonly convertContentToHtml = async (): Promise<string> => {
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(this.postContent.content)
    return processedContent.toString()
  }
  
  getHtmlFixedPageContent = async () => {
    const htmlContent = await this.convertContentToHtml()
    return new PostContent("html", htmlContent)
  }
}