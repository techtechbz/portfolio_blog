import { PostCategory } from "@/lib/posts/dataHandler/postCategory"


const postCategory = new PostCategory()
const currentCategoryist: Array<string> = ["math", "stat", "economics", "coding"]

describe('post category test', () => {
  it('Category list test', () => {
    expect(postCategory.categoryList).toStrictEqual(currentCategoryist)
  })
  
  it('Category params test', () => {
    postCategory.searchCategoryPageParams.map((element) => {
      expect(Object.keys(element.params)).toStrictEqual(["category"])
      expect(currentCategoryist.includes(element.params.category)).toBe(true)
    })
  })
  
  it('Category menu links list test', () => {
    expect(Object.keys(postCategory.categoryMenuLinksList)).toStrictEqual(currentCategoryist)
    Object.entries(postCategory.categoryMenuLinksList).map(([key, value]) => {
      expect(Object.keys(value)).toStrictEqual(["text", "href", "iconTag"])
    })
  })
  
})