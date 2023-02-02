import { FC, memo } from "react";
import dynamic from 'next/dynamic'

import Link from "next/link";

import Stack from "@mui/material/Stack";

import { menuLinksItem } from "@/types/menuLinksList";

import sideMenuCss from "@/styles/moduleCss/sideMenu.module.css"


const FunctionsIcon = dynamic(() => import("@mui/icons-material/Functions"))
const MonetizationOnIcon = dynamic(() => import("@mui/icons-material/MonetizationOn"))
const TerminalIcon = dynamic(() => import("@mui/icons-material/Terminal"))
const BarChartIcon = dynamic(() => import("@mui/icons-material/BarChart"))

const blogIconsList: { [key: string]: any } = {
  "function": FunctionsIcon,
  "monetizationOn": MonetizationOnIcon,
  "terminal": TerminalIcon,
  "barChart": BarChartIcon,
}

const CategoryLink: FC<menuLinksItem> = memo(({ text, href, iconName }: menuLinksItem) => {
  const IconNode = !iconName ? <></> : blogIconsList[iconName]
  return(
    <div className={sideMenuCss.SideMenuLinks}>
      <span>{"・"}</span>
      <Link href={href} passHref>
        <Stack direction="row" spacing={.5}>
          <IconNode className={sideMenuCss.CategoryIcon} />
          <span>{text}</span>
        </Stack>
      </Link>
    </div>
  )
})

export default CategoryLink