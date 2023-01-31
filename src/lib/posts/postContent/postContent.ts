export class PostContent {
  readonly state: "planeMd" |  "html" | "empty" = "empty"
  readonly content: string

  constructor(state: "planeMd" |  "html" | "empty", content: string) {
    this.state = state
    this.content = content
  }

  get isConvertedHtml() {
    return this.state === "html"
  }
}