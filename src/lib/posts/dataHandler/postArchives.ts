import { menuLinksList } from "@/types/menuLinksList"
import { formatDateString } from "./formatDateString"


export class PostArchives {
  readonly archivesList: ReadonlyArray<string> = ["2023-02", "2023-03"]

  get searchArchivesPageParams() {
    return this.archivesList.map((month) => ({ params: { month } }))
  }

  readonly getArchivesText = (month: string): string => {
    // Safari用に日付を補完する
    const filledDate = month + '-01'
    return formatDateString(filledDate, 'ja-JP', { year: "numeric", month: "short" })
  }

  get archivesMenuLinksList(): menuLinksList {
    const generatedList = this.archivesList.reduce((previousList: menuLinksList, month: string): menuLinksList => {
      return Object.assign(previousList, {[month]: {text: this.getArchivesText(month), href: `/posts/archives/${month}`}})
    }, {} as menuLinksList)
    return generatedList
  }
}
