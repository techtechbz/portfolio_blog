import { UnexpectedBehaviorError } from "@/lib/error/unexpectedBehaviorError"

export class PageContent {
  private readonly state: "planeMd" |  "html" | "empty" = "empty"
  private readonly content: string

  constructor(state: "planeMd" |  "html" | "empty", content: string) {
    this.state = state
    this.content = content
  }

  get plainMdContent() {
    if (this.state !== "planeMd") throw new UnexpectedBehaviorError('planeMdではありません。')
    return this.content
  }

  get isConvertedHtml() {
    return this.state === "html"
  }

  get htmlContent() {
    if (this.state !== "html") throw new UnexpectedBehaviorError('HTMLに変換されていません')
    return this.content
  }
}