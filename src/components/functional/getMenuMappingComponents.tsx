import { menuLinksList } from "@/types/menuLinksList"
import { PostArchives } from "@/lib/posts/dataHandler/postArchives"
import { PostCategory } from "@/lib/posts/dataHandler/postCategory"
import { ElementType } from "react"


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
  social: {
    "github": { text: "GitHub", href: "https://github.com/techtechbz", iconName: "github" },
    "note": { text: "Note", href: "https://note.com/mr_techbozu", iconName: "note" },
  }
}

const getMenuList = (menuName: string): menuLinksList => {
  if (menuName === undefined) throw new Error('メニュー名が指定されていません')
  if (menuName in menuList) return menuList[menuName]
  if (menuName === "archives") return new PostArchives().archivesMenuLinksList
  if (menuName === "category") return new PostCategory().categoryMenuLinksList
  throw new Error(`(${menuName})不正な値です。`)
}

export const getMenuMappingComponents = (menuName: string, ChildNode: ElementType): ReadonlyArray<any> => {
  return Object.entries(getMenuList(menuName)).map((menu) => {
    const [key, menuProps] = menu
    return <ChildNode key={key} {...menuProps} />
  })
}