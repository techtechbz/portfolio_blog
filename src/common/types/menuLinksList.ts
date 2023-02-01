export interface menuLinksItem {
  text: string
  href: string
  iconName?: string
}

export interface menuLinksList {
  [key: string]: menuLinksItem
}
