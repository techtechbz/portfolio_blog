import { FC, memo } from "react";
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { menuLinksItem } from "@/types/menuLinksList";
import { getMenuMappingComponents } from "@/components/functional/getMenuMappingComponents";

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

const SitePresentationMenu: FC<menuLinksItem> = memo(({ text, href, iconName }: menuLinksItem) => {
  const IconNode = !iconName ? <></> : blogIconsList[iconName]
  return(
    <div className={indexCss.SitePresentationMenu}>
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
      <p>本サイトは、<strong>『世間を賑わせている技術や知識について、少しだけ親しんでいただく』</strong>ことをコンセプトに制作しました。</p>
      <div className={indexCss.SitePresentationIconList}>
        {getMenuMappingComponents("category", SitePresentationMenu)}
      </div>
    </div>
  )
})
