import { menuLinksList } from "../types/menuLinks";

/**
 * iconName:Material Iconの名前。(例"github" -> FunctionIcon)
 * 
 * 新規でカテゴリーを追加する際は、src/components/uiParts/sideMenu/parts/introductionParts/SocialNetworksMenu.tsx内で、
 * 動的インポートを用いてアイコンのコンポーネントをインポートし、
 * SOCIAL_NETWORK_ICONS_LIST(keyとして)にiconNameとコンポーネントを追加すること。
 */
export const SOCIAL_NETWORK_LIST: menuLinksList = {
  "github": { text: "GitHub", href: "https://github.com/techtechbz", iconName: "github" },
  "note": { text: "Note", href: "https://note.com/mr_techbozu", iconName: "note" },
}