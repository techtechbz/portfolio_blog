import { menuLinksList } from "../types/menuLinks"


/**
 * iconName:Material Iconの名前。(例"function" -> FunctionIcon)
 * 
 * 新規でカテゴリーを追加する際は、src/components/uiParts/sideMenu/parts/TextLinkWithIcon.tsx内で、
 * 動的インポートを用いてアイコンのコンポーネントをインポートし、
 * BLOG_ICONS_LISTにiconName(keyとして)とコンポーネントを追加すること。
 */
export const BLOG_CATEGORIES_LIST: menuLinksList = {
  "math": { text: "数学", href: "/posts/math", iconName: "function" },
  "stat": { text: "統計", href: "/posts/stat", iconName: "barChart"},
  "economics": { text: "経済", href: "/posts/economics", iconName: "monetizationOn" },
  "coding": { text: "プログラミング", href: "/posts/coding", iconName: "terminal" },
}

const allCategoriesPattern = Object.keys(BLOG_CATEGORIES_LIST).reduce(
  (previousCategories: string, currentCategory: string): string => previousCategories + "|" + currentCategory
)

export const ALL_POSTS_PATH_PATTERN = `posts/@(${allCategoriesPattern})/*.md`