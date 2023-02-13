import { GlobMdFilePathPatterns } from "@/lib/posts/dataHandler/mdFilePathPatterns"


const globMdFilePathPatterns = new GlobMdFilePathPatterns()

describe('Md file path patterns test', () => {
  it.each([
    {category: "math", isError: false, expected: "/app/postsMd/math/*.md"},
    {category: "stat", isError: false, expected: "/app/postsMd/stat/*.md"},
    {category: "work", isError: true},
  ])('Break points test', ({category, isError, expected}) => {
    const validator = () => {
      return globMdFilePathPatterns.specificCategoryPostsPathPattern(category)
    }
    if (isError) {
      expect(validator).toThrow()
    } else {
      expect(validator()).toBe(expected)
    }
  })
})