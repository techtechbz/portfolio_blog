import { UnexpectedBehaviorError } from "@/lib/error/unexpectedBehaviorError"
import { MdFilePath } from "@/lib/posts/valueObjects/mdFilePath"


describe('Md file path class test', () => {
  it.each([
    {path: '/app/postsMd/math/valid.md', isError: false, expectedId: 'math/valid'},
    {path: '/app/postsMd/math/valid-second.md', isError: false, expectedId: 'math/valid-second'},
    {path: '/app/postMd/math/valid.md', isError: true},
    {path: '/app/postsMd/codin/valid-second.md', isError: true},
    {path: '/app/postsMd/math/valid-secand.md', isError: true},
    {path: '/app/postsMd/coding/invalid-mdx.mdx', isError: true},
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
    {id: 'math/valid', isError: false, expectedPath: '/app/postsMd/math/valid.md'},
    {id: 'math/valid-second', isError: false, expectedPath: '/app/postsMd/math/valid-second.md'},
    {id: 'codin/valid-second', isError: true},
    {id: 'math/valid-secand', isError: true},
    {id: 'coding/invalid-mdx', isError: true},
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
    {path: 'math/valid'},
    {path: '/app/postsMd/math/valid.md'},
  ])('Invalid path type test ($path)', ({path}) => {
    const defineMdFileClass = () => new MdFilePath("path", path)
    expect(defineMdFileClass).toThrowError(UnexpectedBehaviorError)
  })
})