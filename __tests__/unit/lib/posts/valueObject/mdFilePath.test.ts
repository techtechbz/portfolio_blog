import { UnexpectedBehaviorError } from "@/lib/error/unexpectedBehaviorError"
import { MdFilePath } from "@/lib/posts/valueObjects/mdFilePath"


describe('Md file path class test', () => {
  it.each([
    {path: '/app/postsMd/math/ai-formula.md', isError: false, expectedId: 'math/ai-formula'},
    {path: '/app/postsMd/coding/starting-python.md', isError: false, expectedId: 'coding/starting-python'},
    {path: '/app/postMd/math/ai-formula.md', isError: true},
    {path: '/app/postsMd/mat/ai-formula.md', isError: true},
    {path: '/app/postsMd/math/ai-formul.md', isError: true},
    {path: '/app/postsMd/test/ai-formula.mdx', isError: true},
  ])('Construct md file path class test with full path ($path)', ({path, isError, expectedId}) => {
    if (isError) {
      const defineMdFileClass = () => new MdFilePath("fullPath", path)
      expect(defineMdFileClass).toThrow()
    } else {
      const mdFile = new MdFilePath("fullPath", path)
      expect(mdFile.fullPath).toBe(path)
      expect(mdFile.postId).toBe(expectedId)
    }
  })
  
  it.each([
    {id: 'math/ai-formula', isError: false, expectedPath: '/app/postsMd/math/ai-formula.md'},
    {id: 'coding/starting-python', isError: false, expectedPath: '/app/postsMd/coding/starting-python.md'},
    {id: 'mat/ai-formula', isError: true},
    {id: 'math/ai-formul', isError: true},
    {id: 'test/ai-formula', isError: true},
  ])('Construct md file path class test with id ($id)', ({id, isError, expectedPath}) => {
    if (isError) {
      const defineMdFileClass = () => new MdFilePath("id", id)
      expect(defineMdFileClass).toThrow()
    } else {
      const mdFile = new MdFilePath("id", id)
      expect(mdFile.postId).toBe(id)
      expect(mdFile.fullPath).toBe(expectedPath)
    }
  })

  it.each([
    {path: 'math/ai-formula'},
    {path: '/app/postsMd/math/ai-formula.md'},
  ])('Invalid path type test ($path)', ({path}) => {
    const defineMdFileClass = () => new MdFilePath("path", path)
    expect(defineMdFileClass).toThrowError(UnexpectedBehaviorError)
  })
})