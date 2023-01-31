export interface postMatterResultOverviews {
  readonly id: Readonly<string>
  readonly title: Readonly<string>
  readonly description: Readonly<string>
  readonly date: Readonly<string>
  readonly eyecatchFile: Readonly<string>
  readonly relatedPostsIds: ReadonlyArray<string>
}

export interface postPageData extends postMatterResultOverviews {
  readonly contentHtml: Readonly<string>
}

export interface fixedPageMatterResultOverviews {
  readonly createDate?: Readonly<string>
  readonly updateDate?: Readonly<string>
}

export interface fixedPageData extends fixedPageMatterResultOverviews {
  readonly contentHtml: Readonly<string>
}