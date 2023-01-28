import { ElementType } from "react"

import { ARCHIVES_LIST } from "@/constants/archivesList"
import { BLOG_CATEGORIES_LIST } from "@/constants/blogCategories"
import { SOCIAL_NETWORK_LIST } from "@/constants/socialNetworkList"
import { menuLinksList } from "@/types/menuLinks"


export const getMenuMappingComponents = (menuName: string, ChildNode: ElementType): ReadonlyArray<any> => {
  const menuList: {[key: string]: menuLinksList} = {
    header: {
      "post-index": { text: "投稿一覧", href: "/posts" },
      "about": { text: "サイト紹介", href: "/about" },
      "contact": { text: "お問い合わせ", href: "/contact" }
    },
    footer: {
      "top": { text: "TOP", href: "/" },
      "about": { text: "サイト紹介", href: "/about" },
      "privacy": { text: "プライバシーポリシー", href: "/privacy" },
      "contact": { text: "お問い合わせ", href: "/contact" }
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