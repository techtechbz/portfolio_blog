import {unified} from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"

import { PageContent } from "./pageContent"


export class FixedPageContent {
  private readonly postContent: PageContent

  constructor(content: string) {
    this.postContent = new PageContent("planeMd", content)
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
  
  getHtmlFixedPageContent = async () => {
    const htmlContent = await this.convertContentToHtml()
    return new PageContent("html", htmlContent)
  }
}