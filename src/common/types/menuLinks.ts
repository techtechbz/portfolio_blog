export type menuLinks = {
  readonly text: Readonly<string>
  readonly href: Readonly<string>
  readonly iconName?: Readonly<string>
}

export type menuLinksList = {
  readonly [key: Readonly<string>]: Readonly<menuLinks>
}
