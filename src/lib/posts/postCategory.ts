import { menuLinksList } from "@/types/menuLinks"


export class PostCategory {
  readonly categoryList: ReadonlyArray<string> = ["math", "stat", "economics", "coding"]

  readonly categoryNamesList: Readonly<{[key: string]: string}> = {
    "math": "数学",
    "stat": "統計",
    "economics": "経済",
    "coding": "プログラミング"
  }

  get categoryParams() {
    return this.categoryList.map((category) => ({ params: { category } }))
  }
}

export class CategoryMenuList {
  private readonly postCategory = new PostCategory()

  private readonly categoryIconTagsList: Readonly<{[key: string]: string}> = {
    "math": "function",
    "stat": "barChart",
    "economics": "monetizationOn",
    "coding": "terminal"
  }

  get allCategoriesList(): menuLinksList {
    return this.postCategory.categoryList.reduce((previousList: menuLinksList, category: string): menuLinksList => {
      return Object.assign(previousList, {[category]: {text: this.postCategory.categoryNamesList[category], href: `/posts/${category}`, iconName: this.categoryIconTagsList[category]}})
    }, {})
  }
}