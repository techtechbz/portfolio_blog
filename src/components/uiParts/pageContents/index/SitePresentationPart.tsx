import { FC, memo } from "react";
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { menuLinksItem } from "@/types/menuLinksList";
import { getMenuMappingComponents } from "@/functional/getMenuMappingComponents";

import indexCss from "@/styles/pageCss/index.module.css"

const FunctionsIcon = dynamic(() => import("@mui/icons-material/Functions"))
const MonetizationOnIcon = dynamic(() => import("@mui/icons-material/MonetizationOn"))
const TerminalIcon = dynamic(() => import("@mui/icons-material/Terminal"))
const BarChartIcon = dynamic(() => import("@mui/icons-material/BarChart"))


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blogIconsList: { [key: string]: any } = {
  "function": FunctionsIcon,
  "monetizationOn": MonetizationOnIcon,
  "terminal": TerminalIcon,
  "barChart": BarChartIcon,
}

const SitePresentationMenu: FC<menuLinksItem> = memo(({ text, href, iconTag }: menuLinksItem) => {
  const IconNode = !iconTag ? <></> : blogIconsList[iconTag]
  return(
    <div className={indexCss.SitePresentationMenu}>
      <div className={indexCss.SitePresentationMenuTitleContent}>
        <div className={indexCss.SitePresentationMenuTitle}>{text}</div>
      </div>
      <Link href={href} passHref>
        <div className={indexCss.SitePresentationMenuButton}>
          <IconNode className={indexCss.SitePresentationIcon} />
        </div>
      </Link>
    </div>
  )
})

export const SitePresentationPart: FC = memo(() => {
  return(
    <div className={indexCss.SitePresentationPart}>
      <h2 className={indexCss.SitePresentationPartHeading}>サイトコンセプト</h2>
      <p>本サイトは、世間を賑わせている技術や知識について、<strong>『少しだけ親しんでいただく』</strong>ことをコンセプトに制作しました。</p>
      <div className={indexCss.SitePresentationIconList}>
        {getMenuMappingComponents("category", SitePresentationMenu)}
      </div>
    </div>
  )
})
