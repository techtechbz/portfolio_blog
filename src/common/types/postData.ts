export type matterResultData = {
  readonly title?: Readonly<string>
  readonly description?: Readonly<string>
  readonly date?: Readonly<string>
  readonly eyecatchFile?: Readonly<string>
  readonly relatedPostsIds?: ReadonlyArray<string>
}

export type postsDataForTest = ReadonlyArray<
  matterResultData & {
    readonly id?: string
    readonly contentHtml?: Readonly<string>
  }
>

export type complementedMatterResult = {
  readonly title: Readonly<string>
  readonly description: Readonly<string>
  readonly date: Readonly<string>
  readonly eyecatchFile: Readonly<string>
  readonly relatedPostsIds: ReadonlyArray<string>
}

export type postData = complementedMatterResult & {
  readonly id: Readonly<string>
}

export type htmlPostData = postData & {
  readonly contentHtml: Readonly<string>
}
