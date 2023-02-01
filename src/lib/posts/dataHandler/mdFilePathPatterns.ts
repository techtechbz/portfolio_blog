import { PostCategory } from "./postCategory"


class MdFilePathPatterns {
  protected readonly postCategory = new PostCategory()
  private readonly extraMdPathDirectoriesList: ReadonlyArray<string> = ["fixed", "test"]

  protected get allPostCategoryGroup(): string {
    return this.postCategory.categoryList.reduce((previousCategories: string, currentCategory: string): string => previousCategories + "|" + currentCategory)
  }

  protected get allMdFileDirectoryGroup(): string {
    const allMdFileDirectoryGroup = this.postCategory.categoryList.concat(this.extraMdPathDirectoriesList)
    return allMdFileDirectoryGroup.reduce((previousCategories: string, currentCategory: string): string => previousCategories + "|" + currentCategory)
  }
}

export class GlobMdFilePathPatterns extends MdFilePathPatterns {
  get globAllPostsPathPattern(): string {
    return `/app/postsMd/@(${this.allPostCategoryGroup})/*.md`
  }

  readonly specificCategoryPostsPathPattern = (category: string): string => {
    if (!this.postCategory.categoryList.includes(category)) throw new Error(`(${category}) このカテゴリーは存在しません。`)
    return `/app/postsMd/${category}/*.md`
  }
}

export class RegExpMdFilePathPatterns extends MdFilePathPatterns {
  get fullMdFilePathPattern(): RegExp {
    return new RegExp(`^/app/postsMd/((${this.allMdFileDirectoryGroup})/[0-9a-zA-Z-_]+).md$`)
  }

  get postIdPattern(): RegExp {
    return new RegExp(`^(${this.allMdFileDirectoryGroup})/[0-9a-zA-Z-_]+$`)
  }
}