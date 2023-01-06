import {unified} from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"


const omitLinks = (contents: string): string => contents.replaceAll(/\[([[:^cntrl:]]+)\]\([-_.!~*';/?:@&=+$,%#a-zA-Z0-9]+\)/g, "$1")

const formatContentsForCard = (contents: string): string => {
  const maxCharacterIndex = contents.indexOf("\n", 150)
  const omitContents = maxCharacterIndex === -1 ? contents : contents.substring(0, maxCharacterIndex)
  const formattedContents = omitLinks(omitContents)
  return formattedContents
}

export const convertToCardHtmlContents = async (contents: string): Promise<string> => {
  const omittedContents = formatContentsForCard(contents)
  const processedContent = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify)
  .process(omittedContents)
  return processedContent.toString()
}