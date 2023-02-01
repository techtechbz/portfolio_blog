import {unified} from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"
import rehypeKatex from "rehype-katex"
import rehypeSlug from "rehype-slug"
import rehypeFormat from "rehype-format"
import rehypeSanitize, {defaultSchema, Options} from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"

import { CLOBBER_PREFIX } from "@/constants/postConfig"
import { PostContent } from "./postContent"


export class PostPageContent {
  private readonly postContent: PostContent
  private readonly prismPlugins: ReadonlyArray<string> = ["line-numbers"]
  private readonly codeLanguages: ReadonlyArray<string> = ["javascript", "js", "typescript", "ts", "jsx", "tsx", "css", "html", "md", "markdown", "dockerfile", "bash", "python", "java", "rust", "sql"]

  constructor(content: string) {
    this.postContent = new PostContent("planeMd", content)
  }

  private readonly addCodeAttributes = (content: string): string => {
    const allLanguagesPattern = this.codeLanguages.reduce((previousLanguages: string, currentLanguage: string): string => `${previousLanguages}|${currentLanguage}`)
    const pattern = new RegExp(`\`\`\`(${allLanguagesPattern})`, "g")
    const additionalClassName = this.prismPlugins.reduce((previousPlugin: string, currentPlugin: string): string => previousPlugin + `[class="${currentPlugin}"]`, "")
    return content.replaceAll(pattern, (match) => match + additionalClassName)
  }

  private readonly sanitizeSchema = (): Options => {
    const codeClassNamesList = this.codeLanguages.map((language: string) => "language-" + language)
    const customSchema = {
      ...defaultSchema,
      clobberPrefix: CLOBBER_PREFIX,
      tagNames: [...(defaultSchema.tagNames || []), "svg", "path"],
      attributes:
        { ...defaultSchema.attributes,
          div: [
            ...(defaultSchema.attributes?.div || []),
            ["className", "math", "math-display", "remark-highlight"],
          ],
          code: [
            ...(defaultSchema.attributes?.code || []),
            ["className", ...codeClassNamesList]
          ],
          pre: [
            ...(defaultSchema.attributes?.pre || []),
            ["className", ...this.prismPlugins, ...codeClassNamesList]
          ],
          span: [
            ...(defaultSchema.attributes?.pre || []),
            "className", "style"
          ],
          svg: [
            "viewBox", "preserveAspectRatio", "xmlns"
          ],
          path: [
            "d"
          ]
        }
      }
    return customSchema as Options
  }

  private readonly convertContentToHtml = async (): Promise<string> => {
    const codeAttributesContents = this.addCodeAttributes(this.postContent.content)
    const schema = this.sanitizeSchema()
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(require("remark-prism"), { plugins: this.prismPlugins })
      .use(remarkRehype, {footnoteLabel: "脚注"})
      .use(rehypeSlug)
      .use(rehypeKatex)
      .use(rehypeSanitize, schema)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(codeAttributesContents)
    return processedContent.toString()
  }
  
  readonly htmlPostPageContent = async () => {
    const htmlContent = await this.convertContentToHtml()
    return new PostContent("html", htmlContent)
  }
}