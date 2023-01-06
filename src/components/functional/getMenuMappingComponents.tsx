import { ElementType } from "react"

import { ARCHIVES_LIST } from "src/common/constants/archivesList"
import { BLOG_CATEGORIES_LIST } from "src/common/constants/blogCategories"
import { SOCIAL_NETWORK_LIST } from "src/common/constants/socialNetworkList"
import { menuLinksList } from "src/common/types/menuLinks"


export const getMenuMappingComponents = (menuName: string, ChildNode: ElementType): ReadonlyArray<any> => {
  const menuList: {[key: string]: menuLinksList} = {
    header: {
      "post-index": { text: "投稿一覧", href: "/posts" },
      "about": { text: "サイト紹介", href: "/about" },
      "privacy": { text: "プライバシーポリシー", href: "/privacy" }
    },
    footer: {
      "top": { text: "TOP", href: "/" },
      "about": { text: "サイト紹介", href: "/about" },
      "privacy": { text: "プライバシーポリシー", href: "/privacy" },
    },
    social: SOCIAL_NETWORK_LIST,
    archives: ARCHIVES_LIST,
    category: BLOG_CATEGORIES_LIST
  }
  return Object.entries(menuList[menuName]).map((menu) => {
    const [key, menuProps] = menu
    return <ChildNode key={key} {...menuProps} />
  })
}