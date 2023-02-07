import { menuLinksList } from "@/types/menuLinksList"
import { formatDateString } from "./formatDateString"


export class PostArchives {
  readonly archivesList: ReadonlyArray<string> = ["2023-01", "2023-02"]

  get archivesParams() {
    return this.archivesList.map((month) => ({ params: { month } }))
  }

  readonly getArchivesText = (month: string): string => {
    return formatDateString(month, 'ja-JP', { year: "numeric", month: "short" })
  }

  get archivesMenuLinksList(): menuLinksList {
    const generatedList = this.archivesList.reduce((previousList: menuLinksList, month: string): menuLinksList => {
      return Object.assign(previousList, {[month]: {text: this.getArchivesText(month), href: `/posts/archives/${month}`}})
    }, {} as menuLinksList)
    return generatedList
  }
}
