import { FC, memo } from "react"

import searchCss from "src/common/styles/pageCss/search.module.css"


type Props = {
  resultMessage: string
  isMobile: boolean
}

const SearchErrorResult: FC<Props> = memo(({resultMessage, isMobile}: Props) => {
  const guidingToMenuMessage = isMobile ? "右上のナビゲーションボタンをタップして、" : "サイト右側にあるメニューの"
  const errorMessage = "『カテゴリーメニュー』または『アーカイブメニュー』より、リンクをクリックしてください。"
  return(
    <div className={searchCss.SearchErrorResultContainer}>
      <h1>{resultMessage}</h1>
      <p>{guidingToMenuMessage}{errorMessage}</p>
    </div>
  )
})

export default SearchErrorResult