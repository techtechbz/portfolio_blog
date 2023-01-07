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

import { CODE_LANGUAGES, CLOBBER_PREFIX, PRISM_PLUGINS } from "src/common/constants/postConfig"


const addCodeAttributes = (content: string): string => {
  const allLanguagesPattern = CODE_LANGUAGES.reduce((previousLanguages: string, currentLanguage: string): string => `${previousLanguages}|${currentLanguage}`)
  const pattern = new RegExp(`\`\`\`(${allLanguagesPattern})`, "g")
  const additionalClassName = PRISM_PLUGINS.reduce((previousPlugin: string, currentPlugin: string): string => previousPlugin + `[class="${currentPlugin}"]`, "")
  return content.replaceAll(pattern, (match) => match + additionalClassName)
}

const getSanitizeSchema = (): Options => {
  const codeClassNamesList = CODE_LANGUAGES.map((language: string) => "language-" + language)
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
          ["className", ...PRISM_PLUGINS, ...codeClassNamesList]
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

export const convertToPostPageContents = async (content: string): Promise<string> => {
  const codeAttributesContents = addCodeAttributes(content)
  const schema = getSanitizeSchema()
  const processedContent = await unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(require("remark-prism"), { plugins: PRISM_PLUGINS })
  .use(remarkRehype, {footnoteLabel: "脚注"})
  .use(rehypeSlug)
  .use(rehypeKatex)
  .use(rehypeSanitize, schema)
  .use(rehypeFormat)
  .use(rehypeStringify)
  .process(codeAttributesContents)
  return processedContent.toString()
}