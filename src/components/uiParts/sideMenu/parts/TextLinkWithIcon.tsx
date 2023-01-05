import { FC, memo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import Stack from "@mui/material/Stack";

import { menuLinks } from "src/common/types/menuLinks";

import sideMenuCss from "src/common/styles/moduleCss/sideMenu.module.css"


const FunctionsIcon = dynamic(() => import("@mui/icons-material/Functions"))
const MonetizationOnIcon = dynamic(() => import("@mui/icons-material/MonetizationOn"))
const TerminalIcon = dynamic(() => import("@mui/icons-material/Terminal"))
const BarChartIcon = dynamic(() => import("@mui/icons-material/BarChart"))

const BLOG_ICONS_LIST: { [key: string]: any } = {
  "function": FunctionsIcon,
  "monetizationOn": MonetizationOnIcon,
  "terminal": TerminalIcon,
  "barChart": BarChartIcon,
}

const TextLinkWithIcon: FC<menuLinks> = memo(({ text, href, iconName }: menuLinks) => {
  const IconNode = !iconName ? <></> : BLOG_ICONS_LIST[iconName]
  return(
    <div className={sideMenuCss.SideMenuLinks}>
      <span>{"・"}</span>
      <Link href={href} passHref>
        <Stack direction="row" spacing={.5}>
          <IconNode />
          <span>{text}</span>
        </Stack>
      </Link>
    </div>
  )
})

export default TextLinkWithIcon