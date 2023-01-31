import { MdFilePath } from "@/lib/posts/mdFilePath/valueObect"


describe('Site Introduction page test', () => {
  it.each([
    {path: '/app/postsMd/math/ai-formula.md', isError: false, expectedId: 'math/ai-formula'},
    {path: '/app/postsMd/coding/starting-python.md', isError: false, expectedId: 'coding/starting-python'},
    {path: '/app/postMd/math/ai-formula.md', isError: true},
    {path: '/app/postsMd/mat/ai-formula.md', isError: true},
    {path: '/app/postsMd/math/ai-formul.md', isError: true},
    {path: '/app/postsMd/test/ai-formula.mdx', isError: true},
  ])('Md file class test path ($path)', ({path, isError, expectedId}) => {
    if (isError) {
      const defineMdFileClass = () => new MdFilePath("fullPath", path)
      expect(defineMdFileClass).toThrow()
    } else {
      const mdFile = new MdFilePath("fullPath", path)
      expect(mdFile.fullPath).toBe(path)
      expect(mdFile.postId).toBe(expectedId)
    }
  })
})