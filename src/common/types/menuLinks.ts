export interface menuLinks {
  readonly text: Readonly<string>
  readonly href: Readonly<string>
  readonly iconName?: Readonly<string>
}

export interface menuLinksList {
  readonly [key: Readonly<string>]: Readonly<menuLinks>
}
