import { menuLinksList } from "@/types/menuLinksList"


export class PostCategory {
  readonly categoryList: ReadonlyArray<string> = ["math", "stat", "economics", "coding"]

  readonly categoryNamesList: Readonly<{[key: string]: string}> = {
    "math": "数学",
    "stat": "統計",
    "economics": "経済",
    "coding": "プログラミング"
  }

  private readonly categoryIconTagsList: Readonly<{[key: string]: string}> = {
    "math": "function",
    "stat": "barChart",
    "economics": "monetizationOn",
    "coding": "terminal"
  }

  get searchCategoryPageParams(): Array<{params: {category: string}}> {
    return this.categoryList.map((category) => ({ params: { category } }))
  }

  get categoryMenuLinksList(): menuLinksList {
    const generatedList = this.categoryList.reduce((previousList: menuLinksList, category: string): menuLinksList => {
      return Object.assign(previousList, {[category]: {text: this.categoryNamesList[category], href: `/posts/${category}`, iconTag: this.categoryIconTagsList[category]}})
    }, {} as menuLinksList)
    return generatedList
  }
}