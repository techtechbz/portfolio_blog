import { FC, memo } from "react"

import searchCss from "@/styles/pageCss/search.module.css"


type Props = {
  resultMessage: string
  isDesktop: boolean
}

export const SearchErrorResult: FC<Props> = memo(({resultMessage, isDesktop}: Props) => {
  const guidingToMenuMessage = isDesktop ? "サイト右側にあるメニューの" : "右上のナビゲーションボタンをタップして、"
  const errorMessage = "『カテゴリーメニュー』または『アーカイブメニュー』より、リンクをクリックしてください。"
  return(
    <div className={searchCss.SearchErrorResultContainer}>
      <h1>{resultMessage}</h1>
      <p>{guidingToMenuMessage}{errorMessage}</p>
    </div>
  )
})