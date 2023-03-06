export interface menuLinksItem {
  text: string
  href: string
  iconTag?: string
}

export interface menuLinksList {
  [key: string]: menuLinksItem
}
