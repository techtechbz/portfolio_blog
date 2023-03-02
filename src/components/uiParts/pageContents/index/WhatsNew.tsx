import { FC, memo } from "react";

import { formatDateString } from "@/lib/posts/dataHandler/formatDateString";

import indexCss from "@/styles/pageCss/index.module.css"


export const WhatsNew: FC = memo(() => {
  const whatsNewList = [
    {date: '2023-02-22', news: 'サイトの外観をリニューアルしました!'},
    {date: '2023-02-13', news: 'ホームページを公開しました!'},
  ]
  return(
    <>
      <h2 className="StylingSubHeading">更新情報</h2>
      <div className={indexCss.WhatsNewContainer}>
        <table className={indexCss.WhatsNewTable}>
          <tbody>
            <tr className={indexCss.WhatsNewTableRow}>
              <th className={indexCss.WhatsNewTableDateHeader}>日時</th>
              <th className={indexCss.WhatsNewTableNewsHeader}>ニュース</th>
            </tr>
            {whatsNewList.map(({date, news}, index) => {
              return (
                <tr className={indexCss.WhatsNewTableRow} key={`news-${index}`}>
                  <td className={indexCss.WhatsNewTableDateData}>{formatDateString(date, 'ja-JP', { year: "numeric", month: "short", day: "numeric" })}</td>
                  <td className={indexCss.WhatsNewTableNewsData}>{news}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
})
