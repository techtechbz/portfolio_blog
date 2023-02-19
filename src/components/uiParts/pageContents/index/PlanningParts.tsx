import { FC, memo } from "react"
import Image from 'next/image'

import Card from "@mui/material/Card";

import indexCss from "@/styles/pageCss/index.module.css";


type Plan = {
  id: string
  planIndex: number
  title: string
  description: string
  charmList: ReadonlyArray<string>
}

const planningList = [
  {
    id: "coding",
    title: "サイト制作",
    description: "WordPressなどのCMSに限らず、Node.jsを用いたサイト制作も承っております。",
    charmList: ["WordPress(CMS)", "サイトのカスタマイズ", "レスポンシブ対応"]
  },
  {
    id: "writing",
    title: "記事の執筆",
    description: "プログラミング・経済・その他専門的なジャンルも問わず、執筆いたします。",
    charmList: ["WordPress入稿","丁寧なリサーチ", "SEO対策"]
  },
  {
    id: "analytics",
    title: "データ分析",
    description: "Pythonを使ったデータ分析・スクレイピングも気軽にご相談ください。",
    charmList: ["Google Search Console", "スクレイピング", "その他サイトに関するお困りごと"]
  },
]

const PlanningRow: FC<Plan> = memo((plan: Plan) => {
  return (
    <div className={indexCss.PlanningMenuContainer}>
      <Card raised className={indexCss.PlanningCard}>
        <p className={indexCss.PlanningCardTitle}>{`${plan.planIndex}:${plan.title}`}</p>
        <div className={indexCss.PlanningCardContents}>
          <div className={indexCss.PlanningSvgContainer}>
            <Image className={indexCss.PlanningSvg} src={`/svg/planning/${plan.id}.svg`} alt="planning picture image"
             width={64} height={64} sizes="64px" />
          </div>
          <div className={indexCss.PlanningCardDescription}>
            <p>{plan.description}</p>
            <ul>
              {plan.charmList.map((charm: string, index: number) => {
                return (
                  <li key={`${plan.id}-charm${index}`}>{charm}</li>
                  )
                })}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
})

export const PlanningParts: FC = memo(() => {
  return (
    <div className={indexCss.PlanningBackground}>
      <h2 className={indexCss.PlanningHeader}>お任せください</h2>
      <div className={indexCss.PlanningFlexBox}>
        {planningList.map((plan, index) => {
          return (
            <div key={plan.id} className={indexCss.PlanningMenuRow}>
              <PlanningRow {...{...plan, planIndex: index + 1}} />
            </div>
          )
        })}
      </div>
    </div>
  );
})
