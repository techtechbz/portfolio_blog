import { PostCategory } from "../postCategory"


class MdFilePathsPattern {
  protected readonly postCategory = new PostCategory()
  private readonly extraMdPathList: ReadonlyArray<string> = ["fixed", "test"]

  protected get allPostCategories(): string {
    return this.postCategory.categoryList.reduce((previousCategories: string, currentCategory: string): string => previousCategories + "|" + currentCategory)
  }

  protected get allMdFileDirectories(): string {
    const allMdFileDirectories = this.postCategory.categoryList.concat(this.extraMdPathList)
    return allMdFileDirectories.reduce((previousCategories: string, currentCategory: string): string => previousCategories + "|" + currentCategory)
  }
}

export class GlobMdFilePathsPattern extends MdFilePathsPattern {
  get globAllPostsPathPattern(): string {
    return `/app/postsMd/@(${this.allPostCategories})/*.md`
  }

  readonly specificCategoryPostsPathPattern = (category: string): string => {
    if (!this.postCategory.categoryList.includes(category)) throw new Error(`(${category}) このカテゴリーは存在しません。`)
    return `/app/postsMd/${category}/*.md`
  }
}

export class RegExpMdFilePathsPattern extends MdFilePathsPattern {
  get fullMdFilePathPattern(): RegExp {
    return new RegExp(`^/app/postsMd/((${this.allMdFileDirectories})/[0-9a-zA-Z-_]+).md$`)
  }

  get postIdPattern(): RegExp {
    return new RegExp(`^(${this.allMdFileDirectories})/[0-9a-zA-Z-_]+$`)
  }
}